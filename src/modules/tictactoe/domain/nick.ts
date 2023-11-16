import { Either, left, right } from '../../../modules/shared/domain/either'
import { ValueObject } from '../../../modules/shared/domain/valueObject'
import { NickNotValidError } from './errors/NickNotValidError'

export type NickProps = {
  value: string
}

export const MIN_LENGTH_ALIAS = 4
export const MAX_LENGTH_ALIAS = 16

export type NickCreationResponse = Either<NickNotValidError, Nick>

export class Nick extends ValueObject<NickProps> {
  get value(): string {
    return this.props.value
  }

  private constructor(props: NickProps) {
    super(props)
  }

  public static create(props: NickProps): NickCreationResponse {
    if (props.value.length < MIN_LENGTH_ALIAS || props.value.length > MAX_LENGTH_ALIAS) {
      return left(NickNotValidError.create(props.value))
    }

    return right(new Nick(props))
  }
}
