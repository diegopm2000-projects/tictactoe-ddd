import 'reflect-metadata'

import { DEFAULT_EMAIL, DEFAULT_ID, DEFAULT_NICK } from '../../../../expectations/expectations'

// SUT
import { UserCredential } from '../../../../../../src/modules/auth/domain/userCredential'

describe('UserCredential - Tests', () => {
  describe('create - Tests', () => {
    it('create - successfully case passing id', () => {
      // Arrange
      // N/A
      // Act
      const result = UserCredential.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK }, DEFAULT_ID)
      // Assert
      expect(result).toBeInstanceOf(UserCredential)
      expect(result.email).toStrictEqual(DEFAULT_EMAIL)
      expect(result.nick).toStrictEqual(DEFAULT_NICK)
    })
    it('create - successfully case NOT passing id', () => {
      // Arrange
      // N/A
      // Act
      const result = UserCredential.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK })
      // Assert
      expect(result).toBeInstanceOf(UserCredential)
      expect(result.email).toStrictEqual(DEFAULT_EMAIL)
      expect(result.nick).toStrictEqual(DEFAULT_NICK)
    })
  })
})
