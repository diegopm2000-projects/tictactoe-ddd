import { UniqueEntityID } from '../../../../../src/modules/shared/domain/uniqueEntityID'
import { Email } from '../../../../../src/modules/tictactoe/domain/email'
import { Nick } from '../../../../../src/modules/tictactoe/domain/nick'
import { DEFAULT_UUID_STR } from '../../../expectations/expectations'

// SUT
import { UserCredential } from '../../../../../src/modules/auth/domain/userCredential'

const DEFAULT_EMAIL: Email = <Email>Email.create({ value: 'user@mail.com' }).value
const DEFAULT_NICK: Nick = <Nick>Nick.create({ value: 'alias' }).value
const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value

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
