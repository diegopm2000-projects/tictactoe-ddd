import * as EmailValidator from 'email-validator'

import { Either, left, right } from '../../shared/domain/either'
import { ValueObject } from '../../shared/domain/valueObject'
import { EmailNotValidError } from './errors/EmailNotValidError'

export interface EmailProps {
  value: string
}

export type EmailCreationResponse = Either<EmailNotValidError, Email>

export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value
  }

  private constructor(props: EmailProps) {
    super(props)
  }

  public static create(props: EmailProps): EmailCreationResponse {
    if (!EmailValidator.validate(props.value)) {
      return left(EmailNotValidError.create(props.value))
    }

    return right(new Email(props))
  }
}
