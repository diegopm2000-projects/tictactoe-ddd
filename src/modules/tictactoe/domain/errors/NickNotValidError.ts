import { DomainError } from '../../../../modules/shared/domain/domainError'
import { Nick } from '../nick'

export class NickNotValidError extends DomainError {
  constructor(nickName: string) {
    super(`Nick: ${nickName} is not a valid Nick. The lenght of the nick must be between ${Nick.MIN_LENGTH_ALIAS} and ${Nick.MAX_LENGTH_ALIAS}`)
  }

  public static create(nickName: string): NickNotValidError {
    return new NickNotValidError(nickName)
  }
}
