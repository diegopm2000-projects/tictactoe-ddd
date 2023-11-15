import { DomainError } from '../../../shared/domain/domainError'
import { PIECE_TYPE } from '../piece'

export class TurnNotValidError extends DomainError {
  constructor(pieceType: PIECE_TYPE) {
    super(`Movement not valid. The piece ${pieceType == PIECE_TYPE.X ? 'X' : 'O'} cant not be moved. It's the other player's turn`)
  }

  public static create(pieceType: PIECE_TYPE): TurnNotValidError {
    return new TurnNotValidError(pieceType)
  }
}
