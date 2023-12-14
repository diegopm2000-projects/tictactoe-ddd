// SUT
import { PIECE_TYPE, Piece } from '../../../../../../../src/modules/tictactoe/domain/model/piece'

describe('Piece - Tests', () => {
  describe('constructor - Tests', () => {
    it('constructor - piece X constructed successfully', () => {
      // Arrange
      const type = PIECE_TYPE.X
      // Act
      const myPiece = Piece.create(type)
      // Assert
      expect(myPiece.type).toBe(type)
    })
    it('constructor - piece O constructed successfully', () => {
      // Arrange
      const type = PIECE_TYPE.O
      // Act
      const myPiece = Piece.create(type)
      // Assert
      expect(myPiece.type).toBe(type)
    })
  })
})
