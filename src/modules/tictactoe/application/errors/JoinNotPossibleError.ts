import { ApplicationError } from '../../../shared/application/core/applicationError'

export class JoinNotPossibleError extends ApplicationError {
  constructor(msg: string) {
    super(`Join not possible: ${msg}`)
  }

  public static create(msg: string): JoinNotPossibleError {
    return new JoinNotPossibleError(msg)
  }
}
