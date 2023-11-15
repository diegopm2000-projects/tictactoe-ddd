import { NickNotValidError } from '../../../../../src/tictactoe/domain/errors/NickNotValidError'

// SUT
import { Nick } from '../../../../../src/tictactoe/domain/nick'

describe('Nick - Tests', () => {
  describe('create - Tests', () => {
    it('create - successfuly case', () => {
      // Arrange
      const value = 'alias'
      // Act
      const result = Nick.create({ value })
      // Assert
      expect(result.isRight()).toBe(true)
      expect(result.value).toBeInstanceOf(Nick)
      const myNick: Nick = <Nick>result.value
      expect(myNick.value).toBe(value)
    })
    it('create - failed case', () => {
      // Arrange
      const value = 'too_length_alias_not_valid_and_nonsense'
      // Act
      const result = Nick.create({ value })
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NickNotValidError)
    })
  })
})
