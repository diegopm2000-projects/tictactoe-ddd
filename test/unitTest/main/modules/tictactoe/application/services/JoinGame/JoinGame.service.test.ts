import { Container } from 'inversify'
import 'reflect-metadata'

import { InternalServerError } from '../../../../../../../../src/modules/auth/application/errors/InternalServerError'
import { left, right } from '../../../../../../../../src/modules/shared/domain/core/either'
import { TYPES } from '../../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { BadFormatInDatabaseError } from '../../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { GameNotFoundError } from '../../../../../../../../src/modules/tictactoe/application/errors/GameNotFoundError'
import { JoinNotPossibleError } from '../../../../../../../../src/modules/tictactoe/application/errors/JoinNotPossibleError'
import { PlayerNotFoundError } from '../../../../../../../../src/modules/tictactoe/application/errors/PlayerNotFoundError'
import { IJoinGameRequest, IJoinGameService } from '../../../../../../../../src/modules/tictactoe/application/services/JoinGame/IJoinGame.service'
import { Game } from '../../../../../../../../src/modules/tictactoe/domain/model/game'
import { GameMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { PlayerMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { DEFAULT_CONTAINER, DEFAULT_UNIQUE_ID, EMPTY_BOARD, PLAYER_O, PLAYER_X, PLAYER_X_CREDENTIALS } from '../../../../../../expectations/expectations'

// SUT
const myService = (DEFAULT_CONTAINER as Container).get<IJoinGameService>(TYPES.IJoinGameService)

describe('JoinGameService - Tests', () => {
  describe('JoinGameService - default successfully case', () => {
    beforeEach(() => {
      jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
      jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(
        right(
          Game.create({
            playerO: PLAYER_O,
            board: EMPTY_BOARD,
          })
        )
      )
      jest.spyOn(GameMemoryRepository.prototype, 'save').mockResolvedValue()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('JoinGameService - default successfully case', async () => {
      // Arrange
      const request: IJoinGameRequest = {
        userCredential: PLAYER_X_CREDENTIALS,
        idGame: DEFAULT_UNIQUE_ID,
      }
      // Act
      const joinResponse = await myService.execute(request)
      // Assert
      expect(joinResponse.isRight()).toBe(true)
      expect(joinResponse.value).toBe(true)
    })
  })

  describe('JoinGameService - failed cases', () => {
    describe('JoinGameService - failed case when obtaining player has failed', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(left(BadFormatInDatabaseError.create()))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('JoinGameService - failed case when obtaining player has failed', async () => {
        // Arrange
        const request: IJoinGameRequest = {
          userCredential: PLAYER_X_CREDENTIALS,
          idGame: DEFAULT_UNIQUE_ID,
        }
        // Act
        const joinResponse = await myService.execute(request)
        // Assert
        expect(joinResponse.isLeft()).toBe(true)
        expect(joinResponse.value).toBeInstanceOf(InternalServerError)
      })
    })
    describe('JoinGameService - failed case when obtaining player has not found the player in the system', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(undefined))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('JoinGameService - failed case when obtaining player has not found the player in the system', async () => {
        // Arrange
        const request: IJoinGameRequest = {
          userCredential: PLAYER_X_CREDENTIALS,
          idGame: DEFAULT_UNIQUE_ID,
        }
        // Act
        const joinResponse = await myService.execute(request)
        // Assert
        expect(joinResponse.isLeft()).toBe(true)
        expect(joinResponse.value).toBeInstanceOf(PlayerNotFoundError)
      })
    })
    describe('JoinGameService - failed case when obtaining game has failed', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(left(BadFormatInDatabaseError.create()))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('JoinGameService - failed case when obtaining game has failed', async () => {
        // Arrange
        const request: IJoinGameRequest = {
          userCredential: PLAYER_X_CREDENTIALS,
          idGame: DEFAULT_UNIQUE_ID,
        }
        // Act
        const joinResponse = await myService.execute(request)
        // Assert
        expect(joinResponse.isLeft()).toBe(true)
        expect(joinResponse.value).toBeInstanceOf(InternalServerError)
      })
    })
    describe('JoinGameService - failed case when obtaining game has not found the player in the system', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(undefined))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('JoinGameService - failed case when obtaining game has not found the player in the system', async () => {
        // Arrange
        const request: IJoinGameRequest = {
          userCredential: PLAYER_X_CREDENTIALS,
          idGame: DEFAULT_UNIQUE_ID,
        }
        // Act
        const joinResponse = await myService.execute(request)
        // Assert
        expect(joinResponse.isLeft()).toBe(true)
        expect(joinResponse.value).toBeInstanceOf(GameNotFoundError)
      })
    })
    describe('JoinGameService - failed case when join the game was not possible', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(
          right(
            Game.create({
              playerX: PLAYER_X,
              playerO: PLAYER_O,
              board: EMPTY_BOARD,
            })
          )
        )
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('JoinGameService - failed case when join the game was not possible', async () => {
        // Arrange
        const request: IJoinGameRequest = {
          userCredential: PLAYER_X_CREDENTIALS,
          idGame: DEFAULT_UNIQUE_ID,
        }
        // Act
        const joinResponse = await myService.execute(request)
        // Assert
        expect(joinResponse.isLeft()).toBe(true)
        expect(joinResponse.value).toBeInstanceOf(JoinNotPossibleError)
      })
    })
  })
})
