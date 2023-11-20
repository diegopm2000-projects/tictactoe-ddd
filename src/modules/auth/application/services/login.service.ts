import { inject, injectable } from 'inversify'

import { IUseCase } from '../../../shared/application/usecase'
import { left, right } from '../../../shared/domain/either'
import { TYPES } from '../../../shared/infrastructure/dependencyInjection/types'
import { ILoginRequest, ILoginResponse } from '../ports/input/ILogin.service'
import { IHashHelper } from '../ports/output/IHash.helper'
import { IUserRepository } from '../ports/output/IUser.repository'
import { LoginError } from './errors/LoginError'
import { InternalServerError } from './errors/InternalServerError'

@injectable()
export class LoginService implements IUseCase<ILoginRequest, ILoginResponse> {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IHashHelper) private hashHelper: IHashHelper
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
