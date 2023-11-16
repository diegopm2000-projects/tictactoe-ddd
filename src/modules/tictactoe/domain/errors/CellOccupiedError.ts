import { DomainError } from '../../../../modules/shared/domain/domainError'
import { Position } from '../position'

export class CellOccupiedError extends DomainError {
  constructor(row: Position, column: Position) {
    super(`Movement not valid. The position of (${row.value}, ${column.value}) is occupied`)
  }

  public static create(row: Position, column: Position): CellOccupiedError {
    return new CellOccupiedError(row, column)
  }
}
