import * as EmailValidator from 'email-validator'

import { Either, left, right } from '../core/either'
import { ValueObject } from '../core/valueObject'
import { EmailNotValidError } from '../../../tictactoe/domain/errors/EmailNotValidError'

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
