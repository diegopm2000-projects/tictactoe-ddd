import { Either, left, right } from '../../../shared/domain/core/either'
import { ValueObject } from '../../../shared/domain/core/valueObject'
import { PositionNotValidError } from '../errors/PositionNotValidError'

export type PositionProps = {
  value: number
}

export type PositionCreationResult = Either<PositionNotValidError, Position>

export class Position extends ValueObject<PositionProps> {
  public static MIN_POSITION = 0
  public static MAX_POSITION = 2

  get value(): number {
    return this.props.value
  }

  private constructor(props: PositionProps) {
    super(props)
  }

  public static create(props: PositionProps): PositionCreationResult {
    if (props.value < Position.MIN_POSITION || props.value > Position.MAX_POSITION) {
      return left(PositionNotValidError.create(props.value))
    }

    return right(new Position(props))
  }

  public static createPosition0(): Position {
    return new Position({ value: 0 })
  }

  public static createPosition1(): Position {
    return new Position({ value: 1 })
  }

  public static createPosition2(): Position {
    return new Position({ value: 2 })
  }
}
