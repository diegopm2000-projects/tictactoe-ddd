import { ApplicationError } from '../../../shared/application/core/applicationError'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'

export class PlayerNotJoinedToGameError extends ApplicationError {
  constructor(uuid: UniqueEntityID) {
    super(`The player with uuid: ${uuid.value} has not joined this game`)
  }

  public static create(uuid: UniqueEntityID): PlayerNotJoinedToGameError {
    return new PlayerNotJoinedToGameError(uuid)
  }
}
