import { DomainError } from '../../../shared/domain/core/domainError'

export class BoardCreationError extends DomainError {
  constructor(msg: string) {
    super(msg)
  }

  public static create(msg: string) {
    return new BoardCreationError(msg)
  }
}
