import { v4 as uuidv4, validate } from 'uuid'

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
  readonly value: string

  private constructor(uuidStr: string) {
    this.value = uuidStr
  }

  static create(uuidStr: string): CreateUniqueEntityIDResponse {
    if (!validate(uuidStr)) {
      return left(UuidNotValidError.create(uuidStr))
    }

    return right(new UniqueEntityID(uuidStr))
  }

  static validate(uuidStr: string): boolean {
    return validate(uuidStr)
  }

  static generate(): UniqueEntityID {
    return <UniqueEntityID>this.create(uuidv4()).value
  }

  equals(uuid: UniqueEntityID) {
    return this.value == uuid.value
  }
}
