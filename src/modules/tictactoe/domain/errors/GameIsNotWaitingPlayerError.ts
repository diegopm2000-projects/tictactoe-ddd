import { DomainError } from '../../../shared/domain/core/domainError'

export class GameIsNotWaitingPlayerError extends DomainError {
  constructor() {
    super('Game is not waiting more players')
  }

  public static create(): GameIsNotWaitingPlayerError {
    return new GameIsNotWaitingPlayerError()
  }
}
