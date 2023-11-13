import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'

export class ErrorUuidNotValid extends Error {
  constructor(uuidstr: string) {
    super(`The value: ${uuidstr} is not a valid UUID`)
  }
}

export class UniqueEntityID {
  readonly id: string

  private constructor(uuidStr: string) {
    this.id = uuidStr
  }

  static create(uuidStr: string) {
    if (!uuidValidate(uuidStr)) {
      throw new ErrorUuidNotValid(uuidStr)
    }

    return new UniqueEntityID(uuidStr)
  }

  static validate(uuidStr: string): boolean {
    return uuidValidate(uuidStr)
  }

  static generate(): UniqueEntityID {
    return this.create(uuidv4())
  }

  equals(uuid: UniqueEntityID) {
    return this.id == uuid.id
  }
}
