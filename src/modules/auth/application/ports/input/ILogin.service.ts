import { IUseCase } from '../../../../shared/application/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UserCredential } from '../../../domain/userCredential'
import { InternalServerError } from '../../services/errors/InternalServerError'
import { LoginError } from '../../services/errors/LoginError'

export interface ILoginRequest {
  email: string
  secret: string
}

export type ILoginResponse = Either<InternalServerError | LoginError, UserCredential>

export interface ILoginService extends IUseCase<ILoginRequest, ILoginResponse> {}
