import { inject, injectable } from 'inversify'

import { Either, left, right } from '../../../shared/domain/either'
import { TYPES } from '../../../shared/infrastructure/dependencyInjection/types'
import { Email } from '../../../tictactoe/domain/email'
import { Nick } from '../../../tictactoe/domain/nick'
import { User } from '../../domain/user'
import { IRegisterRequest, IRegisterResponse, IRegisterService } from '../ports/input/IRegister.service'
import { IHashHelper } from '../ports/output/IHash.helper'
import { IUserRepository } from '../ports/output/IUser.repository'
import { InputParamsInUserRegisterError } from './errors/InputParamsInUserRegisterError'
import { UserAlreadyRegisteredError } from './errors/UserAlreadyRegisteredError'
import { InternalServerError } from './errors/InternalServerError'

type NickAndEmailValidated = {
  nick: Nick
  email: Email
}

type RequestValidationResponse = Either<InputParamsInUserRegisterError, NickAndEmailValidated>

@injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IHashHelper) private hashHelper: IHashHelper
  ) {}

  private validateRequest(request: IRegisterRequest): RequestValidationResponse {
    const nickCreationResponse = Nick.create({ value: request.nick })
    if (nickCreationResponse.isLeft()) {
      return left(InputParamsInUserRegisterError.create(nickCreationResponse.value.message))
    }
    const emailCreationResponse = Email.create({ value: request.email })
    if (emailCreationResponse.isLeft()) {
      return left(InputParamsInUserRegisterError.create(emailCreationResponse.value.message))
    }

    return right({
      nick: nickCreationResponse.value,
      email: emailCreationResponse.value,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: IRegisterRequest): Promise<IRegisterResponse> {
    const requestValidationResponse = this.validateRequest(request)

    if (requestValidationResponse.isLeft()) {
      return left(requestValidationResponse.value)
    }

    const userFoundResponse = await this.userRepository.getOneByEmail(request.email)

    if (userFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }
    const userFound = userFoundResponse.value

    if (userFound) {
      return left(UserAlreadyRegisteredError.create())
    }

    const user = User.create({
      nick: requestValidationResponse.value.nick,
      email: requestValidationResponse.value.email,
      hashedSecret: this.hashHelper.toHash(request.secret),
    })

    await this.userRepository.save(user)

    return right(true)
  }
}
