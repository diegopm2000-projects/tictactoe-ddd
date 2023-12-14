import { ApplicationError } from '../../../shared/application/core/applicationError'

export class MovementNotValidError extends ApplicationError {
  constructor(msg: string) {
    super(`Movement not valid: ${msg}`)
  }

  public static create(msg: string): MovementNotValidError {
    return new MovementNotValidError(msg)
  }
}
