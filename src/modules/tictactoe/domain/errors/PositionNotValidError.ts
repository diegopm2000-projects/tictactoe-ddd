import { DomainError } from '../../../../modules/shared/domain/domainError'

export class PositionNotValidError extends DomainError {
  constructor(position: number) {
    super(`Position: ${position} is not a valid Position. The position must be 0, 1 or 2`)
  }

  public static create(position: number): PositionNotValidError {
    return new PositionNotValidError(position)
  }
}
