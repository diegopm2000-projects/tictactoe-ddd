import { isUuid, uuid } from 'uuidv4'
import { Either, left, right } from './either'

export class UuidNotValidError extends Error {
  constructor(uuidstr: string) {
    super(`The value: ${uuidstr} is not a valid UUID`)
  }

  public static create(uuidstr: string): UuidNotValidError {
    return new UuidNotValidError(uuidstr)
  }
}

export type CreateUniqueEntityIDResponse = Either<UuidNotValidError, UniqueEntityID>

export class UniqueEntityID {
  readonly id: string

  private constructor(uuidStr: string) {
    this.id = uuidStr
  }

  static create(uuidStr: string): CreateUniqueEntityIDResponse {
    if (!isUuid(uuidStr)) {
      return left(UuidNotValidError.create(uuidStr))
    }

    return right(new UniqueEntityID(uuidStr))
  }

  static validate(uuidStr: string): boolean {
    return isUuid(uuidStr)
  }

  static generate(): UniqueEntityID {
    return <UniqueEntityID>this.create(uuid()).value
  }

  equals(uuid: UniqueEntityID) {
    return this.id == uuid.id
  }
}
