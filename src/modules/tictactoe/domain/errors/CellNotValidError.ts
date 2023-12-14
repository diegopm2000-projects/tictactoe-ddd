import { DomainError } from '../../../shared/domain/core/domainError'

export class CellNotValidError extends DomainError {
  constructor(text: string) {
    super(`Cell with te text: ${text} is not a valid Cell`)
  }

  public static create(text: string): CellNotValidError {
    return new CellNotValidError(text)
  }
}
