import { UserCredential } from '../../../../../src/modules/auth/domain/userCredential'
import { UniqueEntityID } from '../../../../../src/modules/shared/domain/uniqueEntityID'
import { Email } from '../../../../../src/modules/tictactoe/domain/email'
import { Nick } from '../../../../../src/modules/tictactoe/domain/nick'
import { DEFAULT_UUID_STR } from '../../../expectations/expectations'

// SUT
import { User } from '../../../../../src/modules/auth/domain/user'

const DEFAULT_EMAIL: Email = <Email>Email.create({ value: 'user@mail.com' }).value
const DEFAULT_NICK: Nick = <Nick>Nick.create({ value: 'alias' }).value
const DEFAULT_HASHED_SECRET = 'myhashedsecret'
const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value

describe('User - Tests', () => {
  describe('create - Tests', () => {
    it('create - successfully case passing id', () => {
      // Arrange
      // N/A
      // Act
      const result = User.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK, hashedSecret: DEFAULT_HASHED_SECRET }, DEFAULT_ID)
      // Assert
      expect(result).toBeInstanceOf(User)
      expect(result.email).toStrictEqual(DEFAULT_EMAIL)
      expect(result.nick).toStrictEqual(DEFAULT_NICK)
      expect(result.hashedSecret).toStrictEqual(DEFAULT_HASHED_SECRET)
    })
    it('create - successfully case NOT passing id', () => {})
  })

  describe('getUserCredential - Tests', () => {
    it('getUserCredential - Tests', () => {
      // Arrange
      const myUser = User.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK, hashedSecret: DEFAULT_HASHED_SECRET }, DEFAULT_ID)
      // Act
      const result = myUser.getUserCredential()
      // Assert
      expect(result).toBeInstanceOf(UserCredential)
      expect(result.email).toStrictEqual(DEFAULT_EMAIL)
      expect(result.nick).toStrictEqual(DEFAULT_NICK)
    })
  })
})
