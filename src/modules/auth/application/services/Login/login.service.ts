import { inject, injectable } from 'inversify'

import { left, right } from '../../../../shared/domain/core/either'
import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { ILoginRequest, ILoginResponse, ILoginService } from './ILogin.service'
import { IHashHelper } from '../../helpers/IHash.helper'
import { IUserRepository } from '../../../domain/repositories/IUser.repository'
import { InternalServerError } from '../../errors/InternalServerError'
import { LoginError } from '../../errors/LoginError'

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IHashHelper) private hashHelper: IHashHelper
  ) {}

  async execute(request: ILoginRequest): Promise<ILoginResponse> {
    const userFoundResponse = await this.userRepository.getOneByEmail(request.email)

    if (userFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }
    const userFound = userFoundResponse.value

    if (!userFound) {
      return left(LoginError.create())
    }

    const secretMatched = this.hashHelper.compare(request.secret, userFound.hashedSecret)
    if (!secretMatched) {
      return left(LoginError.create())
    }

    return right(userFound.getUserCredential())
  }
}
