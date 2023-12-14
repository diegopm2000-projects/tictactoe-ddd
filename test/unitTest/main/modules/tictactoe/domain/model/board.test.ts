import { BoardCreationError } from '../../../../../../../src/modules/tictactoe/domain/errors/BoardCreationError'
import { CellOccupiedError } from '../../../../../../../src/modules/tictactoe/domain/errors/CellOccupiedError'
import { Cell } from '../../../../../../../src/modules/tictactoe/domain/model/cell'
import { Piece, PIECE_TYPE } from '../../../../../../../src/modules/tictactoe/domain/model/piece'
import { Position } from '../../../../../../../src/modules/tictactoe/domain/model/position'

// SUT
import { Board } from '../../../../../../../src/modules/tictactoe/domain/model/board'

const DEFAULT_EMPTY_PROPS = {
  arrayCells: [
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}

const ALT_PROPS = {
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create(), Cell.create()],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}

const DEFAULT_BOARD: Board = <Board>Board.create(DEFAULT_EMPTY_PROPS).value
const ALT_BOARD: Board = <Board>Board.create(ALT_PROPS).value

describe('Board - Tests', () => {
  describe('create - Tests', () => {
    it('create - case when the board is created successfully', () => {
      // Arrange
      const props = {
        arrayCells: [
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
        ],
      }
      // Act
      const myBoardResponse = Board.create(props)
      // Assert
      expect(myBoardResponse.isRight()).toBe(true)
      expect(myBoardResponse.isLeft()).toBe(false)
      const myBoard: Board = <Board>myBoardResponse.value
      expect(myBoard.arrayCells).toStrictEqual(props.arrayCells)
    })
    it('create - failed case when the length of rows is not valid', () => {
      // Arrange
      const props = {
        arrayCells: [
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
        ],
      }
      // Act
      const myBoardResponse = Board.create(props)
      // Assert
      expect(myBoardResponse.isRight()).toBe(false)
      expect(myBoardResponse.isLeft()).toBe(true)
      expect(myBoardResponse.value).toBeInstanceOf(BoardCreationError)
    })
    it('create - failed case when the length of columns is not valid', () => {
      // Arrange
      const props = {
        arrayCells: [
          [Cell.create(), Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
          [Cell.create(), Cell.create(), Cell.create()],
        ],
      }
      // Act
      const myBoardResponse = Board.create(props)
      // Assert
      expect(myBoardResponse.isRight()).toBe(false)
      expect(myBoardResponse.isLeft())
      expect(myBoardResponse.value).toBeInstanceOf(BoardCreationError)
    })
  })

  describe('getCell - Tests', () => {
    it('getCell - case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.getCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toStrictEqual(Cell.create())
    })
    it('getCell - case when cell is NOT empty', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.getCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toStrictEqual(Cell.create({ cell: Piece.create(PIECE_TYPE.X) }))
    })
  })

  describe('isXInCell - Tests', () => {
    it('isXInCell - case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.isXInCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toBe(false)
    })
    it('isXInCell - case when all board is NOT an empty case and contains a X', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isXInCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toBe(true)
    })
    it('isXInCell - case when all board is NOT an empty case and contains a O', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isXInCell(Position.createPosition1(), Position.createPosition0())
      // Assert
      expect(result).toBe(false)
    })
  })

  describe('isOInCell - Tests', () => {
    it('isOInCell - case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.isOInCell(Position.createPosition1(), Position.createPosition1())
      // Assert
      expect(result).toBe(false)
    })
    it('isOInCell - case when all board is NOT an empty case and contains a X', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isOInCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toBe(false)
    })
    it('isOInCell - case when all board is NOT an empty case and contains a O', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isOInCell(Position.createPosition1(), Position.createPosition0())
      // Assert
      expect(result).toBe(true)
    })
  })

  describe('isEmptyCell - Tests', () => {
    it('isEmptyCell - case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.isEmptyCell(Position.createPosition1(), Position.createPosition1())
      // Assert
      expect(result).toBe(true)
    })
    it('isEmptyCell - case when all board is NOT an empty case and contains a X', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isEmptyCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toBe(false)
    })
    it('isEmptyCell - case when all board is NOT an empty case and contains a O', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isEmptyCell(Position.createPosition1(), Position.createPosition0())
      // Assert
      expect(result).toBe(false)
    })
  })

  describe('isOccupiedCell - Tests', () => {
    it('isOccupiedCell - case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.isOccupiedCell(Position.createPosition1(), Position.createPosition1())
      // Assert
      expect(result).toBe(false)
    })
    it('isOccupiedCell - case when all board is NOT an empty case and contains a X', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isOccupiedCell(Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result).toBe(true)
    })
    it('isOccupiedCell - case when all board is NOT an empty case and contains a O', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.isOccupiedCell(Position.createPosition1(), Position.createPosition0())
      // Assert
      expect(result).toBe(true)
    })
  })

  describe('setPiece - Tests', () => {
    it('setPiece - successfully case when the cell is empty', () => {
      // Arrange
      const myBoard = DEFAULT_BOARD
      // Act
      const result = myBoard.setPiece(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result.isRight()).toBe(true)
      expect(result.value).toBe(true)
    })
    it('setPiece - failed case when the cell is NOT empty', () => {
      // Arrange
      const myBoard = ALT_BOARD
      // Act
      const result = myBoard.setPiece(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(CellOccupiedError)
    })
  })
})
