import { IUseCase } from '../../../../shared/application/core/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UserCredential } from '../../../domain/model/userCredential'
import { InternalServerError } from '../../errors/InternalServerError'
import { LoginError } from '../../errors/LoginError'

export interface ILoginRequest {
  email: string
  secret: string
}

export type ILoginResponse = Either<InternalServerError | LoginError, UserCredential>

export interface ILoginService extends IUseCase<ILoginRequest, ILoginResponse> {}
