import { ApplicationError } from '../../../shared/application/core/applicationError'

export class RowPositionNotValidError extends ApplicationError {
  constructor(row: number) {
    super(`The row: ${row} is not valid`)
  }

  public static create(row: number): RowPositionNotValidError {
    return new RowPositionNotValidError(row)
  }
}
