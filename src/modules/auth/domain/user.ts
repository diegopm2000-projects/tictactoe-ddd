import { AggregateRoot } from '../../shared/domain/aggregateRoot'
import { UniqueEntityID } from '../../shared/domain/uniqueEntityID'
import { Email } from '../../tictactoe/domain/email' // TODO - esto debería ir al shared (se usa en auth y en tictactoe)
import { Nick } from '../../tictactoe/domain/nick' // TODO - esto debería ir al shared (se usa en auth y en tictactoe)
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

  get id(): UniqueEntityID {
    return this.id
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
