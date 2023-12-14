import 'reflect-metadata'

import { DEFAULT_EMAIL, DEFAULT_UNIQUE_ID, DEFAULT_NICK } from '../../../../../../expectations/expectations'
import { Player } from '../../../../../../../../src/modules/tictactoe/domain/model/player'

// SUT
import { PlayerModelPersistenceConverter } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.modelPersistence.converter'
import { UuidNotValidError } from '../../../../../../../../src/modules/shared/domain/core/uniqueEntityID'
import { NickNotValidError } from '../../../../../../../../src/modules/tictactoe/domain/errors/NickNotValidError'
import { EmailNotValidError } from '../../../../../../../../src/modules/tictactoe/domain/errors/EmailNotValidError'

describe('PlayerModelPersistenceConverter - Tests', () => {
  describe('modelToModelPersistence - Tests', () => {
    it('modelToModelPersistence - default successfully case', () => {
      // Arrange
      const player = Player.create(
        {
          email: DEFAULT_EMAIL,
          nick: DEFAULT_NICK,
        },
        DEFAULT_UNIQUE_ID
      )
      // Act
      const result = PlayerModelPersistenceConverter.getInstance().modelToModelPersistence(player)
      // Assert
      expect(result.id).toStrictEqual(player.id.value)
      expect(result.nick).toStrictEqual(player.nick.value)
      expect(result.email).toStrictEqual(player.email.value)
    })
  })

  describe('modelPersistenceToModel - Tests', () => {
    describe('modelPersistenceToModel - default successfully case', () => {
      it('modelPersistenceToModel - default successfully case', () => {
        // Arrange
        const userModelPersistence = {
          id: DEFAULT_UNIQUE_ID.value,
          nick: DEFAULT_NICK.value,
          email: DEFAULT_EMAIL.value,
        }
        // Act
        const result = PlayerModelPersistenceConverter.getInstance().modelPersistenceToModel(userModelPersistence)
        // Assert
        const myPlayer: Player = <Player>result.value
        expect(result.isRight())
        expect(myPlayer.id.value).toBe(userModelPersistence.id)
        expect(myPlayer.email.value).toBe(userModelPersistence.email)
        expect(myPlayer.nick.value).toBe(userModelPersistence.nick)
      })
    })

    describe('modelPersistenceToModel - failed cases', () => {
      it('modelPersistenceToModel - failed case when id is not valid', () => {
        // Arrange
        const userModelPersistence = {
          id: 'nonsense',
          nick: DEFAULT_NICK.value,
          email: DEFAULT_EMAIL.value,
        }
        // Act
        const result = PlayerModelPersistenceConverter.getInstance().modelPersistenceToModel(userModelPersistence)
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(UuidNotValidError)
      })
      it('modelPersistenceToModel - failed case when nick is not valid', () => {
        // Arrange
        const userModelPersistence = {
          id: DEFAULT_UNIQUE_ID.value,
          nick: '',
          email: DEFAULT_EMAIL.value,
        }
        // Act
        const result = PlayerModelPersistenceConverter.getInstance().modelPersistenceToModel(userModelPersistence)
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(NickNotValidError)
      })
      it('modelPersistenceToModel - failed case when email is not valid', () => {
        // Arrange
        const userModelPersistence = {
          id: DEFAULT_UNIQUE_ID.value,
          nick: DEFAULT_NICK.value,
          email: '',
        }
        // Act
        const result = PlayerModelPersistenceConverter.getInstance().modelPersistenceToModel(userModelPersistence)
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(EmailNotValidError)
      })
    })
  })
})
