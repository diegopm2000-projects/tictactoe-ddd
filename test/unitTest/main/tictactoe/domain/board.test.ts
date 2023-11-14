import { Cell } from '../../../../../src/tictactoe/domain/cell'

// SUT
import { Board } from '../../../../../src/tictactoe/domain/board'
import { BoardCreationError } from '../../../../../src/tictactoe/domain/errors/BoardCreationError'

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
})
