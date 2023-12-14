import { ApplicationError } from '../../../shared/application/core/applicationError'

export class ColumnPositionNotValidError extends ApplicationError {
  constructor(column: number) {
    super(`The colmun: ${column} is not valid`)
  }

  public static create(column: number): ColumnPositionNotValidError {
    return new ColumnPositionNotValidError(column)
  }
}
