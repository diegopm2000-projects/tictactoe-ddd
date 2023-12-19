import { InternalServerError } from '../../../../auth/application/errors/InternalServerError'
import { ApplicationError } from '../../../../shared/application/core/applicationError'
import { Either, left, right } from '../../../../shared/domain/core/either'
import { ObjectWasFoundResponse } from '../../../../shared/infrastructure/persistence/IRepository'

export class HandlerRepoUtil<T> {
  public handleObjectWasFound(objWasFoundResponse: ObjectWasFoundResponse<T>, applicationError: ApplicationError): Either<ApplicationError, T> {
    if (objWasFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }
    const objFound = objWasFoundResponse.value
    if (!objFound) {
      return left(applicationError)
    }
    return right(objFound)
  }

  public static getInstance<T>(): HandlerRepoUtil<T> {
    return new HandlerRepoUtil<T>()
  }
}
