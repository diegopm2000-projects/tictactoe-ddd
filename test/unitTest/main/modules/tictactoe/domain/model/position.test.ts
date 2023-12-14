import { PositionNotValidError } from '../../../../../../../src/modules/tictactoe/domain/errors/PositionNotValidError'

// SUT
import { Position } from '../../../../../../../src/modules/tictactoe/domain/model/position'

describe('Position - Tests', () => {
  describe('create - Tests', () => {
    it('create - successfully case', () => {
      // Arrange
      const value = 0
      // Act
      const result = Position.create({ value })
      // Assert
      expect(result.isRight()).toBe(true)
      expect(result.value).toBeInstanceOf(Position)
      const myPosition = <Position>result.value
      expect(myPosition.value).toBe(value)
    })
    it('create - failed case when value introduced as parameter is not valid', () => {
      // Arrange
      const value = 4
      // Act
      const result = Position.create({ value })
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(PositionNotValidError)
    })
  })

  describe('createPosition0 - Tests', () => {
    it('createPosition0 - successfully case', () => {
      // Arrange
      // N/A
      // Act
      const result = Position.createPosition0()
      // Expect
      expect(result.value).toBe(0)
    })
  })

  describe('createPosition1 - Tests', () => {
    it('createPosition1 - successfully case', () => {
      // Arrange
      // N/A
      // Act
      const result = Position.createPosition1()
      // Expect
      expect(result.value).toBe(1)
    })
  })

  describe('createPosition2 - Tests', () => {
    it('createPosition2 - successfully case', () => {
      // Arrange
      // N/A
      // Act
      const result = Position.createPosition2()
      // Expect
      expect(result.value).toBe(2)
    })
  })
})
