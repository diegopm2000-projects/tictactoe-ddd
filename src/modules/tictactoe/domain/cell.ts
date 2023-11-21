import { ValueObject } from '../../shared/domain/core/valueObject'
import { PIECE_TYPE, Piece } from './piece'

export type CellProps = {
  cell: Piece | undefined
}

export class Cell extends ValueObject<CellProps> {
  get cell(): Piece | undefined {
    return this.props.cell
  }

  private constructor(props: CellProps) {
    super(props)
  }

  public static create(props?: CellProps): Cell {
    return new Cell(props ? props : { cell: undefined })
  }

  public isOccupied(): boolean {
    return this.props.cell instanceof Piece
  }

  public isEmpty(): boolean {
    return !this.isOccupied()
  }

  public isXInCell(): boolean {
    return this.props.cell instanceof Piece && this.props.cell.type == PIECE_TYPE.X
  }

  public isOInCell(): boolean {
    return this.props.cell instanceof Piece && this.props.cell.type == PIECE_TYPE.O
  }
}
