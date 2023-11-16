import { ApplicationError } from '../../../../shared/application/applicationError'

export class InputParamsInUserRegisterError extends ApplicationError {
  constructor(subMessage: string) {
    super(`Error in registration. ${subMessage}`)
  }

  public static create(subMessage: string): InputParamsInUserRegisterError {
    return new InputParamsInUserRegisterError(subMessage)
  }
}
