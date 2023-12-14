import 'reflect-metadata'

import { User } from '../../../../../../../../src/modules/auth/domain/model/user'
import { BadFormatInDatabaseError } from '../../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { ALT_UNIQUE_ID, DEFAULT_EMAIL, DEFAULT_HASHED_SECRET, DEFAULT_USER, DEFAULT_UUID_STR } from '../../../../../../expectations/expectations'

// SUT
import { UserMemoryRepository } from '../../../../../../../../src/modules/auth/infrastructure/persistence/inMemory/User.memory.repository'

describe('UserMemoryRepository - Tests', () => {
  describe('save - Tests', () => {
    let myUserMemoryRepository: UserMemoryRepository
    it('save - successfully case when user was found in the database (creation)', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneById(DEFAULT_USER.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(User)
    })
    it('save - successfully case when user was found in the database (update)', async () => {
      // Arrange
      // N/A
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneById(DEFAULT_USER.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(User)
    })
  })
  describe('getOneById - Tests', () => {
    let myUserMemoryRepository: UserMemoryRepository
    it('getOneById - successfully case when user was found', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneById(DEFAULT_USER.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(User)
    })
    it('getOneById - successfully case when user was NOT found', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneById(ALT_UNIQUE_ID)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeUndefined()
    })
    it('getOneById - failed case when the user was found in database but is in bad format', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      myUserMemoryRepository.setDatabase([
        {
          id: DEFAULT_UUID_STR,
          email: DEFAULT_EMAIL.value,
          nick: '',
          hashedSecret: DEFAULT_HASHED_SECRET,
        },
      ])
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneById(DEFAULT_USER.id)
      expect(response.isLeft()).toBe(true)
      expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
    })
  })
  describe('getOneByEmail - Tests', () => {
    let myUserMemoryRepository: UserMemoryRepository
    it('getOneByEmail - successfully case when user was found', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneByEmail(DEFAULT_USER.email.value)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(User)
    })
    it('getOneByEmail - successfully case when user was NOT found', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneByEmail('otheruser@mail.com')
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeUndefined()
    })
    it('getOneByEmail - failed case when the user was found in database but is in bad format', async () => {
      // Arrange
      myUserMemoryRepository = new UserMemoryRepository()
      myUserMemoryRepository.setDatabase([
        {
          id: DEFAULT_UUID_STR,
          email: DEFAULT_EMAIL.value,
          nick: '',
          hashedSecret: DEFAULT_HASHED_SECRET,
        },
      ])
      // Act
      await myUserMemoryRepository.save(DEFAULT_USER)
      // Assert
      const response = await myUserMemoryRepository.getOneByEmail(DEFAULT_USER.email.value)
      expect(response.isLeft()).toBe(true)
      expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
    })
  })
})
