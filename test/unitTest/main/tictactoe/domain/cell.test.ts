import { PIECE_TYPE, Piece } from '../../../../../src/tictactoe/domain/piece'

// SUT
import { Cell } from '../../../../../src/tictactoe/domain/cell'

describe('Cell - Tests', () => {
  describe('create - Tests', () => {
    it('create - case when a X piece is passed as parameter', () => {
      // Arrange
      const props = {
        cell: Piece.create(PIECE_TYPE.X),
      }
      // Act
      const myCell = Cell.create(props)
      // Assert
      expect(myCell.cell).toStrictEqual(props.cell)
    })
    it('create - case when a O piece is passed as parameter', () => {
      // Arrange
      const props = {
        cell: Piece.create(PIECE_TYPE.O),
      }
      // Act
      const myCell = Cell.create(props)
      // Assert
      expect(myCell.cell).toStrictEqual(props.cell)
    })
    it('create - case when an undefined value (EMPTY) is passed as parameter', () => {
      // Arrange
      const props = {
        cell: undefined,
      }
      // Act
      const myCell = Cell.create(props)
      // Assert
      expect(myCell.cell).toStrictEqual(props.cell)
    })
  })

  describe('isEmpty - Tests', () => {
    it('isEmpty - case when the cell is empty', () => {
      // Arrange
      const myCell = Cell.create({ cell: undefined })
      // Act
      const result = myCell.isEmpty()
      // Assert
      expect(result).toBe(true)
    })
    it('isEmpty - case when the cell is NOT empty', () => {
      // Arrange
      const myCell = Cell.create({
        cell: Piece.create(PIECE_TYPE.O),
      })
      // Act
      const result = myCell.isEmpty()
      // Assert
      expect(result).toBe(false)
    })
  })

  describe('isOccupied - Tests', () => {
    it('isOccupied - case when the cell is occupied', () => {
      // Arrange
      const myCell = Cell.create({
        cell: Piece.create(PIECE_TYPE.O),
      })
      // Act
      const result = myCell.isOccupied()
      // Assert
      expect(result).toBe(true)
    })
    it('isOccupied - case when the cell is NOT occupied', () => {
      // Arrange
      const myCell = Cell.create({ cell: undefined })
      // Act
      const result = myCell.isOccupied()
      // Assert
      expect(result).toBe(false)
    })
  })

  describe('isXInCell - Tests', () => {
    it('isXInCell - case when X is in cell', () => {
      // Arrange
      const myCell = Cell.create({ cell: Piece.create(PIECE_TYPE.X) })
      // Act
      const result = myCell.isXInCell()
      // Assert
      expect(result).toBe(true)
    })
    it('isXInCell - case when X is NOT in cell', () => {
      // Arrange
      const myCell = Cell.create({ cell: undefined })
      // Act
      const result = myCell.isXInCell()
      // Assert
      expect(result).toBe(false)
    })
  })

  describe('isOInCell - Tests', () => {
    it('isOInCell - case when O is in cell', () => {
      // Arrange
      const myCell = Cell.create({ cell: Piece.create(PIECE_TYPE.O) })
      // Act
      const result = myCell.isOInCell()
      // Assert
      expect(result).toBe(true)
    })
    it('isOInCell - case when O is NOT in cell', () => {
      // Arrange
      const myCell = Cell.create({ cell: undefined })
      // Act
      const result = myCell.isOInCell()
      // Assert
      expect(result).toBe(false)
    })
  })
})
