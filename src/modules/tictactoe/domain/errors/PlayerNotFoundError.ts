import { DomainError } from '../../../shared/domain/core/domainError'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'

export class PlayerNotFoundError extends DomainError {
  constructor(uuid: UniqueEntityID) {
    super(`Player with id: ${uuid.value} was not found in the system`)
  }

  public static create(uuid: UniqueEntityID): PlayerNotFoundError {
    return new PlayerNotFoundError(uuid)
  }
}
