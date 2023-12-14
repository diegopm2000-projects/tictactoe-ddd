import { ApplicationError } from '../../../shared/application/applicationError'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'

export class GameNotFoundError extends ApplicationError {
  constructor(uuid: UniqueEntityID) {
    super(`Game with id: ${uuid.value} was not found in the system`)
  }

  public static create(uuid: UniqueEntityID): GameNotFoundError {
    return new GameNotFoundError(uuid)
  }
}
