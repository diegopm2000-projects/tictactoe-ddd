import { InternalServerError } from '../../../../auth/application/services/errors/InternalServerError'
import { UserCredential } from '../../../../auth/domain/userCredential'
import { IUseCase } from '../../../../shared/application/usecase'
import { Either } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { PIECE_TYPE } from '../../../domain/piece'

export interface ICreateGameRequest {
  userCredential: UserCredential
  pieceType: PIECE_TYPE
}

export type ICreateGameResponse = Either<InternalServerError, UniqueEntityID>

export interface ICreateGameService extends IUseCase<ICreateGameRequest, ICreateGameResponse> {}
