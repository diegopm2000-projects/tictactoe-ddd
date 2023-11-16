import { ApplicationError } from '../../../../shared/application/applicationError'

export class UserAlreadyRegisteredError extends ApplicationError {
  constructor() {
    super('The user is already registered')
  }

  public static create(): UserAlreadyRegisteredError {
    return new UserAlreadyRegisteredError()
  }
}
