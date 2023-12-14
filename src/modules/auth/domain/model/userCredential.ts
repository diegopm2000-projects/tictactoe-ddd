import { Entity } from '../../../shared/domain/core/entity'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'
import { Email } from '../../../shared/domain/model/email'
import { Nick } from '../../../shared/domain/model/nick'

export type UserCredentialProps = {
  email: Email
  nick: Nick
}

export class UserCredential extends Entity<UserCredentialProps> {
  get nick(): Nick {
    return this.props.nick
  }

  get email(): Email {
    return this.props.email
  }

  private constructor(props: UserCredentialProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: UserCredentialProps, id?: UniqueEntityID) {
    return new UserCredential(props, id)
  }
}
