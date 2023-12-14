import { InternalServerError } from '../../../../auth/application/errors/InternalServerError'
import { UserCredential } from '../../../../auth/domain/model/userCredential'
import { IUseCase } from '../../../../shared/application/core/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { PIECE_TYPE } from '../../../domain/model/piece'
import { PlayerNotFoundError } from '../../errors/PlayerNotFoundError'

export interface ICreateGameRequest {
  userCredential: UserCredential
  pieceType: PIECE_TYPE
}

export type ICreateGameResponse = Either<InternalServerError | PlayerNotFoundError, UniqueEntityID>

export interface ICreateGameService extends IUseCase<ICreateGameRequest, ICreateGameResponse> {}
