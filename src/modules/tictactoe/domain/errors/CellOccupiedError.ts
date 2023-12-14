import { DomainError } from '../../../shared/domain/core/domainError'
import { Position } from '../model/position'

export class CellOccupiedError extends DomainError {
  constructor(row: Position, column: Position) {
    super(`Movement not valid. The position of (${row.value}, ${column.value}) is occupied`)
  }

  public static create(row: Position, column: Position): CellOccupiedError {
    return new CellOccupiedError(row, column)
  }
}
