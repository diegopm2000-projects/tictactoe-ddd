import { ApplicationError } from '../../../shared/application/core/applicationError'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'

export class PlayerNotFoundError extends ApplicationError {
  constructor(uuid: UniqueEntityID) {
    super(`Player with id: ${uuid.value} was not found in the system`)
  }

  public static create(uuid: UniqueEntityID): PlayerNotFoundError {
    return new PlayerNotFoundError(uuid)
  }
}
