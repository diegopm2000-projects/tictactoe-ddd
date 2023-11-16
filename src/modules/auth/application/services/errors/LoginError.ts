import { ApplicationError } from '../../../../shared/application/applicationError'

export class LoginError extends ApplicationError {
  constructor() {
    super('Login Error. Bad email or password passed')
  }

  public static create(): LoginError {
    return new LoginError()
  }
}
