export class BadFormatInDatabaseError extends Error {
  constructor() {
    super('Bad format in database Error. Object model could not be obtained')
  }

  public static create(): BadFormatInDatabaseError {
    return new BadFormatInDatabaseError()
  }
}
