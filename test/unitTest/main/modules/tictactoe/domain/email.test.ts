import { EmailNotValidError } from '../../../../../../src/modules/tictactoe/domain/errors/EmailNotValidError'

// SUT
import { Email } from '../../../../../../src/modules/tictactoe/domain/email'

describe('Email - Tests', () => {
  describe('create - Tests', () => {
    it('create - successfuly case', () => {
      // Arrange
      const value = 'user@mail.com'
      // Act
      const result = Email.create({ value })
      // Assert
      expect(result.isRight()).toBe(true)
      expect(result.value).toBeInstanceOf(Email)
      const myEmail: Email = <Email>result.value
      expect(myEmail.value).toBe(value)
    })
    it('create - failed case', () => {
      // Arrange
      const value = 'nonsense'
      // Act
      const result = Email.create({ value })
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(EmailNotValidError)
    })
  })
})
