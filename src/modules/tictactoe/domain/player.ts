import { Either, left, right } from '../../../modules/shared/domain/either'
import { UniqueEntityID } from '../../../modules/shared/domain/uniqueEntityID'
import { AggregateRoot } from '../../shared/domain/aggregateRoot'
import { Email } from './email'
import { EmailNotValidError } from './errors/EmailNotValidError'
import { NickNotValidError } from './errors/NickNotValidError'
import { Nick } from './nick'

export interface PlayerProps {
  nick: Nick
  email: Email
}

export interface PlayerCreationParams {
  nick: string
  email: string
}

export type PlayerCreationResponse = Either<NickNotValidError | EmailNotValidError, Player>

export class Player extends AggregateRoot<PlayerProps> {
  get nick(): Nick {
    return this.props.nick
  }

  get email(): Email {
    return this.props.email
  }

  private constructor(props: PlayerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(params: PlayerCreationParams, id?: UniqueEntityID): PlayerCreationResponse {
    const nickCreationResponse = Nick.create({ value: params.nick })
    const emailCreationResponse = Email.create({ value: params.email })

    if (nickCreationResponse.isLeft()) {
      return left(nickCreationResponse.value)
    }
    if (emailCreationResponse.isLeft()) {
      return left(emailCreationResponse.value)
    }

    const nickValidated: Nick = nickCreationResponse.value
    const emailValidated: Email = emailCreationResponse.value

    return right(new Player({ nick: nickValidated, email: emailValidated }, id))
  }
}
