import { AggregateRoot } from '../../../shared/domain/core/aggregateRoot'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'
import { Email } from '../../../shared/domain/model/email'
import { Nick } from '../../../shared/domain/model/nick'
import { UserCredential } from './userCredential'

export type UserProps = {
  email: Email
  nick: Nick
  hashedSecret: string
}

export class User extends AggregateRoot<UserProps> {
  get nick(): Nick {
    return this.props.nick
  }

  get email(): Email {
    return this.props.email
  }

  get hashedSecret(): string {
    return this.props.hashedSecret
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: UserProps, id?: UniqueEntityID) {
    return new User(props, id)
  }

  getUserCredential(): UserCredential {
    return UserCredential.create({ email: this.email, nick: this.nick }, this.id)
  }
}
