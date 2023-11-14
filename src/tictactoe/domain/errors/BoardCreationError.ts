import { DomainError } from '../../../shared/domain/domainError'

export enum ROW_OR_COLUMN {
  ROW = 'row',
  COLUMN = 'column',
}

export class BoardCreationError extends DomainError {
  constructor(rowOrColum: ROW_OR_COLUMN) {
    super(`Board creation failed. There is a ${rowOrColum} with a size that is not valid. Must be 3`)
  }

  public static create(rowOrColum: ROW_OR_COLUMN) {
    return new BoardCreationError(rowOrColum)
  }
}
