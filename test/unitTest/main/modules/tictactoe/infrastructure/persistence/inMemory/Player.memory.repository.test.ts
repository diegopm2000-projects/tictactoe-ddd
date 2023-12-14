import 'reflect-metadata'

import { BadFormatInDatabaseError } from '../../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { ALT_UNIQUE_ID, PLAYER_X, PLAYER_X_UUID_STR } from '../../../../../../expectations/expectations'
import { Player } from '../../../../../../../../src/modules/tictactoe/domain/player'

// SUT
import { PlayerMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'

describe('PlayerMemoryRepository - Tests', () => {
  describe('save - Tests', () => {
    let myPlayerMemoryRepository: PlayerMemoryRepository
    it('save - successfully case when player was found in the database (creation)', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneById(PLAYER_X.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Player)
    })
    it('save - successfully case when player was found in the database (update)', async () => {
      // Arrange
      // N/A
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneById(PLAYER_X.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Player)
    })
  })
  describe('getOneById - Tests', () => {
    let myPlayerMemoryRepository: PlayerMemoryRepository
    it('getOneById - successfully case when user was found', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneById(PLAYER_X.id)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Player)
    })
    it('getOneById - successfully case when user was NOT found', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneById(ALT_UNIQUE_ID)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeUndefined()
    })
    it('getOneById - failed case when the user was found in database but is in bad format', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      myPlayerMemoryRepository.setDatabase([
        {
          id: PLAYER_X_UUID_STR,
          email: 'playerEmail@mail.com',
          nick: 'a',
        },
      ])
      // Act
      const response = await myPlayerMemoryRepository.getOneById(PLAYER_X.id)
      // Assert
      expect(response.isLeft()).toBe(true)
      expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
    })
  })
  describe('getOneByEmail - Tests', () => {
    let myPlayerMemoryRepository: PlayerMemoryRepository
    it('getOneByEmail - successfully case when user was found', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneByEmail(PLAYER_X.email.value)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Player)
    })
    it('getOneByEmail - successfully case when user was NOT found', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneByEmail('otherplayer@mail.com')
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeUndefined()
    })
    it('getOneByEmail - failed case when the user was found in database but is in bad format', async () => {
      // Arrange
      myPlayerMemoryRepository = new PlayerMemoryRepository()
      myPlayerMemoryRepository.setDatabase([
        {
          id: PLAYER_X_UUID_STR,
          email: PLAYER_X.email.value,
          nick: 'a',
        },
      ])
      // Act
      await myPlayerMemoryRepository.save(PLAYER_X)
      // Assert
      const response = await myPlayerMemoryRepository.getOneByEmail(PLAYER_X.email.value)
      expect(response.isLeft()).toBe(true)
      expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
    })
  })
})
