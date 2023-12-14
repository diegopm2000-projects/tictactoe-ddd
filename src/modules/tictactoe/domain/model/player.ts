import { AggregateRoot } from '../../../shared/domain/core/aggregateRoot'
import { Either } from '../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'
import { Email } from '../../../shared/domain/model/email'
import { Nick } from '../../../shared/domain/model/nick'
import { EmailNotValidError } from '../errors/EmailNotValidError'
import { NickNotValidError } from '../errors/NickNotValidError'

export interface PlayerProps {
  nick: Nick
  email: Email
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

  public static create(props: PlayerProps, id?: UniqueEntityID): Player {
    return new Player(props, id)
  }
}
