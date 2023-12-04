import { DomainError } from '../../../shared/domain/core/domainError'
import { PIECE_TYPE } from '../piece'

export class WaitingPlayersError extends DomainError {
  constructor(pieceType: PIECE_TYPE) {
    super(`Movement not Valid. The game is waiting the player ${pieceType}`)
  }

  public static create(pieceType: PIECE_TYPE): WaitingPlayersError {
    return new WaitingPlayersError(pieceType)
  }
}
