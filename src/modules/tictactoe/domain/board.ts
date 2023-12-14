/* eslint-disable @typescript-eslint/no-explicit-any */

import { Either, left, right } from '../../shared/domain/core/either'
import { Entity } from '../../shared/domain/core/entity'
import { UniqueEntityID } from '../../shared/domain/core/uniqueEntityID'
import { Cell } from './cell'
import { BoardCreationError } from './errors/BoardCreationError'
import { CellOccupiedError } from './errors/CellOccupiedError'
import { PIECE_TYPE, Piece } from './piece'
import { Position } from './position'

export type BoardProps = {
  arrayCells: Array<Array<Cell>>
}

export type CreateBoardResponse = Either<BoardCreationError, Board>
export type SetPieceResponse = Either<CellOccupiedError, boolean>

export class Board extends Entity<BoardProps> {
  get arrayCells(): Array<Array<Cell>> {
    return this.props.arrayCells
  }

  private constructor(props: BoardProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: BoardProps, id?: UniqueEntityID): CreateBoardResponse {
    // Check number of rows
    if (props.arrayCells.length != 3) {
      return left(BoardCreationError.create('Board creation failed. There is a row with a size that is not valid. Must be 3'))
    }
    // Check all number of columns in each row
    const badColumnFound = props.arrayCells.find((column: Array<Cell>) => column.length != 3)
    if (badColumnFound) {
      return left(BoardCreationError.create('Board creation failed. There is a column with a size that is not valid. Must be 3'))
    }

    return right(new Board(props, id))
  }

  public static createNewEmptyBoard(): Board {
    const props = {
      arrayCells: [
        [Cell.create(), Cell.create(), Cell.create()],
        [Cell.create(), Cell.create(), Cell.create()],
        [Cell.create(), Cell.create(), Cell.create()],
      ],
    }
    return new Board(props)
  }

  getCell(row: Position, column: Position): Cell {
    return this.props.arrayCells[row.value][column.value]
  }

  isXInCell(row: Position, column: Position): boolean {
    return this.props.arrayCells[row.value][column.value].isXInCell()
  }

  isOInCell(row: Position, column: Position): boolean {
    return this.props.arrayCells[row.value][column.value].isOInCell()
  }

  isEmptyCell(row: Position, column: Position): boolean {
    return this.props.arrayCells[row.value][column.value].isEmpty()
  }

  isOccupiedCell(row: Position, column: Position): boolean {
    return !this.props.arrayCells[row.value][column.value].isEmpty()
  }

  setPiece(pieceType: PIECE_TYPE, row: Position, column: Position): SetPieceResponse {
    if (this.props.arrayCells[row.value][column.value].isOccupied()) {
      return left(CellOccupiedError.create(row, column))
    }
    this.props.arrayCells[row.value][column.value] = Cell.create({ cell: Piece.create(pieceType) })

    return right(true)
  }
}
