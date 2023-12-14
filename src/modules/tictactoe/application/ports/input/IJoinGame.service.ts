import { InternalServerError } from '../../../../auth/application/services/errors/InternalServerError'
import { UserCredential } from '../../../../auth/domain/userCredential'
import { IUseCase } from '../../../../shared/application/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { JoinNotPossibleError } from '../../errors/JoinNotPossibleError'

export interface IJoinGameRequest {
  userCredential: UserCredential
  idGame: UniqueEntityID
}

export type IJoinGameResponse = Either<InternalServerError | JoinNotPossibleError, boolean>

export interface IJoinGameService extends IUseCase<IJoinGameRequest, IJoinGameResponse> {}
