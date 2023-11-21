import { ValueObject } from '../../shared/domain/core/valueObject'

export enum PIECE_TYPE {
  O = 'O',
  X = 'X',
}

export interface PieceProps {
  type: PIECE_TYPE
}

export class Piece extends ValueObject<PieceProps> {
  get type(): PIECE_TYPE {
    return this.props.type
  }

  private constructor(props: PieceProps) {
    super(props)
  }

  public static create(type: PIECE_TYPE): Piece {
    return new Piece({ type })
  }
}
