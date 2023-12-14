import { InternalServerError } from '../../../../auth/application/errors/InternalServerError'
import { UserCredential } from '../../../../auth/domain/model/userCredential'
import { IUseCase } from '../../../../shared/application/core/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { GameNotFoundError } from '../../errors/GameNotFoundError'
import { JoinNotPossibleError } from '../../errors/JoinNotPossibleError'
import { PlayerNotFoundError } from '../../errors/PlayerNotFoundError'

export interface IJoinGameRequest {
  userCredential: UserCredential
  idGame: UniqueEntityID
}

export type IJoinGameResponse = Either<InternalServerError | PlayerNotFoundError | GameNotFoundError | JoinNotPossibleError, boolean>

export interface IJoinGameService extends IUseCase<IJoinGameRequest, IJoinGameResponse> {}
