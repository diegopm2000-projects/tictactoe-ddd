import { ApplicationError } from '../../../../shared/application/applicationError'

export class InternalServerError extends ApplicationError {
  constructor() {
    super('Internal Server Error. An internal server error was produced executing this operation.')
  }

  public static create(): InternalServerError {
    return new InternalServerError()
  }
}
