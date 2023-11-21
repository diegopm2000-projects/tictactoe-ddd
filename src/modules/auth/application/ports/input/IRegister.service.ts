import { IUseCase } from '../../../../shared/application/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { InputParamsInUserRegisterError } from '../../services/errors/InputParamsInUserRegisterError'
import { InternalServerError } from '../../services/errors/InternalServerError'
import { UserAlreadyRegisteredError } from '../../services/errors/UserAlreadyRegisteredError'

export interface IRegisterRequest {
  nick: string
  email: string
  secret: string
}

export type IRegisterResponse = Either<InternalServerError | InputParamsInUserRegisterError | UserAlreadyRegisteredError, boolean>

export interface IRegisterService extends IUseCase<IRegisterRequest, IRegisterResponse> {}
