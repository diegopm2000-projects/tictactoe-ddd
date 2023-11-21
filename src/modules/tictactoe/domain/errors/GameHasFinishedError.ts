import { DomainError } from '../../../shared/domain/core/domainError'

export class GameHasFinishedError extends DomainError {
  constructor() {
    super('Movement not valid. The game has already ended')
  }

  public static create(): GameHasFinishedError {
    return new GameHasFinishedError()
  }
}
