import { IUseCase } from '../../../../shared/application/core/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { InputParamsInUserRegisterError } from '../../errors/InputParamsInUserRegisterError'
import { InternalServerError } from '../../errors/InternalServerError'
import { UserAlreadyRegisteredError } from '../../errors/UserAlreadyRegisteredError'

export interface IRegisterRequest {
  nick: string
  email: string
  secret: string
}

export type IRegisterResponse = Either<InternalServerError | InputParamsInUserRegisterError | UserAlreadyRegisteredError, boolean>

export interface IRegisterService extends IUseCase<IRegisterRequest, IRegisterResponse> {}
