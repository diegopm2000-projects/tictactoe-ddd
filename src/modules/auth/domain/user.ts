import { Entity } from '../../shared/domain/entity'
import { UniqueEntityID } from '../../shared/domain/uniqueEntityID'
import { Email } from '../../tictactoe/domain/email'
import { Nick } from '../../tictactoe/domain/nick'
import { UserCredential } from './userCredential'

export type UserProps = {
  email: Email
  nick: Nick
  hashedSecret: string
}

export class User extends Entity<UserProps> {
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
    return UserCredential.create({ email: this.email, nick: this.nick })
  }
}
