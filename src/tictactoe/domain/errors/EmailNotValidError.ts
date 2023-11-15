import { DomainError } from '../../../shared/domain/domainError'

export class EmailNotValidError extends DomainError {
  constructor(email: string) {
    super(`Email: ${email} is not a valid Email`)
  }

  public static create(email: string): EmailNotValidError {
    return new EmailNotValidError(email)
  }
}
