/* eslint-disable sonarjs/no-duplicate-string */

import 'reflect-metadata'

import { User } from '../../../../../../../../src/modules/auth/domain/user'
import { UserModelPersistence } from '../../../../../../../../src/modules/auth/infrastructure/persistence/inMemory/User.modelPersistence'
import { UniqueEntityID, UuidNotValidError } from '../../../../../../../../src/modules/shared/domain/uniqueEntityID'
import { Email } from '../../../../../../../../src/modules/tictactoe/domain/email'
import { EmailNotValidError } from '../../../../../../../../src/modules/tictactoe/domain/errors/EmailNotValidError'
import { NickNotValidError } from '../../../../../../../../src/modules/tictactoe/domain/errors/NickNotValidError'
import { Nick } from '../../../../../../../../src/modules/tictactoe/domain/nick'
import { DEFAULT_UUID_STR } from '../../../../../../expectations/expectations'

// SUT
import { UserModelPersistenceConverter } from '../../../../../../../../src/modules/auth/infrastructure/persistence/inMemory/User.modelPersistence.converter'

const DEFAULT_EMAIL: Email = <Email>Email.create({ value: 'user@mail.com' }).value
const DEFAULT_NICK: Nick = <Nick>Nick.create({ value: 'alias' }).value
const DEFAULT_HASHED_SECRET = 'myhashedsecret'
const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value

describe('UserModelPersistenceConverter - Tests', () => {
  describe('modelToModelPersistence - Tests', () => {
    it('modelToModelPersistence - default successfully case', () => {
      // Arrange
      const myUser: User = User.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK, hashedSecret: DEFAULT_HASHED_SECRET }, DEFAULT_ID)
      // Act
      const result: UserModelPersistence = UserModelPersistenceConverter.getInstance().modelToModelPersistence(myUser)
      // Assert
      expect(result.id).toBe(DEFAULT_ID.value)
      expect(result.nick).toBe(DEFAULT_NICK.value)
      expect(result.email).toBe(DEFAULT_EMAIL.value)
      expect(result.hashedSecret).toBe(DEFAULT_HASHED_SECRET)
    })
  })

  describe('modelPersistenceToModel - Tests', () => {
    it('modelPersistenceToModel - default successfully case', () => {
      // Arrange
      const myUserModelPersistence = {
        id: DEFAULT_UUID_STR,
        nick: 'alias',
        email: 'user@mail.com',
        hashedSecret: 'myhashedsecret',
      }
      // Act
      const result = UserModelPersistenceConverter.getInstance().modelPersistenceToModel(myUserModelPersistence)
      // Assert
      expect(result.isRight()).toBe(true)
      const myUser = <User>result.value
      expect(myUser.id.value).toBe(myUserModelPersistence.id)
      expect(myUser.nick.value).toBe(myUserModelPersistence.nick)
      expect(myUser.email.value).toBe(myUserModelPersistence.email)
      expect(myUser.hashedSecret).toBe(myUserModelPersistence.hashedSecret)
    })
    it('modelPersistenceToModel - failed case when id is NOT valid', () => {
      // Arrange
      const myUserModelPersistence = {
        id: 'nonsense',
        nick: 'alias',
        email: 'user@mail.com',
        hashedSecret: 'myhashedsecret',
      }
      // Act
      const result = UserModelPersistenceConverter.getInstance().modelPersistenceToModel(myUserModelPersistence)
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(UuidNotValidError)
    })
    it('modelPersistenceToModel - failed case when nick is NOT valid', () => {
      // Arrange
      const myUserModelPersistence = {
        id: DEFAULT_UUID_STR,
        nick: '',
        email: 'user@mail.com',
        hashedSecret: 'myhashedsecret',
      }
      // Act
      const result = UserModelPersistenceConverter.getInstance().modelPersistenceToModel(myUserModelPersistence)
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NickNotValidError)
    })
    it('modelPersistenceToModel - failed case when email is NOT valid', () => {
      // Arrange
      const myUserModelPersistence = {
        id: DEFAULT_UUID_STR,
        nick: 'alias',
        email: 'nonsense',
        hashedSecret: 'myhashedsecret',
      }
      // Act
      const result = UserModelPersistenceConverter.getInstance().modelPersistenceToModel(myUserModelPersistence)
      // Assert
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(EmailNotValidError)
    })
  })
})
