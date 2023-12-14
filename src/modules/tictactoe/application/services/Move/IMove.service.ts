import { InternalServerError } from '../../../../auth/application/errors/InternalServerError'
import { UserCredential } from '../../../../auth/domain/model/userCredential'
import { IUseCase } from '../../../../shared/application/core/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { ColumnPositionNotValidError } from '../../errors/ColumnPositionNotValidError.'
import { GameNotFoundError } from '../../errors/GameNotFoundError'
import { MovementNotValidError } from '../../errors/MovementNotValidError'
import { PlayerNotFoundError } from '../../errors/PlayerNotFoundError'
import { PlayerNotJoinedToGameError } from '../../errors/PlayerNotJoinedToGameError'
import { RowPositionNotValidError } from '../../errors/RowPositionNotValidError'

export interface IMoveRequest {
  userCredential: UserCredential
  idGame: UniqueEntityID
  row: number
  col: number
}

export type IMoveResponse = Either<
  | InternalServerError
  | PlayerNotFoundError
  | GameNotFoundError
  | PlayerNotJoinedToGameError
  | RowPositionNotValidError
  | ColumnPositionNotValidError
  | MovementNotValidError,
  boolean
>

export interface IMoveService extends IUseCase<IMoveRequest, IMoveResponse> {}
