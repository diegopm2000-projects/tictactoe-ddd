import { DomainError } from '../../../../modules/shared/domain/domainError'

export class GameHasFinishedError extends DomainError {
  constructor() {
    super('Movement not valid. The game has already ended')
  }

  public static create(): GameHasFinishedError {
    return new GameHasFinishedError()
  }
}
