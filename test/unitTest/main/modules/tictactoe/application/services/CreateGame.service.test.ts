import { Container } from 'inversify'
import 'reflect-metadata'

import { DEFAULT_CONTAINER, PLAYER_X, PLAYER_X_CREDENTIALS } from '../../../../../expectations/expectations'
import { TYPES } from '../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { ICreateGameService } from '../../../../../../../src/modules/tictactoe/application/ports/input/ICreateGame.service'
import { PIECE_TYPE } from '../../../../../../../src/modules/tictactoe/domain/piece'
import { left, right } from '../../../../../../../src/modules/shared/domain/core/either'
import { PlayerMemoryRepository } from '../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { GameMemoryRepository } from '../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { BadFormatInDatabaseError } from '../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { InternalServerError } from '../../../../../../../src/modules/auth/application/services/errors/InternalServerError'
import { PlayerNotFoundError } from '../../../../../../../src/modules/tictactoe/domain/errors/PlayerNotFoundError'

// SUT
const myService = (DEFAULT_CONTAINER as Container).get<ICreateGameService>(TYPES.ICreateGameService)

describe('CreateGameService - Tests', () => {
  describe('CreateGameService - successfully cases', () => {
    beforeEach(() => {
      jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
      jest.spyOn(GameMemoryRepository.prototype, 'save').mockResolvedValue()
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('CreateGameService - successfully cases', async () => {
      // Arrange
      const request = {
        userCredential: PLAYER_X_CREDENTIALS,
        pieceType: PIECE_TYPE.X,
      }
      // Act
      const resultResponse = await myService.execute(request)
      // Assert
      expect(resultResponse.isRight()).toBe(true)
    })
  })

  describe('CreateGameService - failed cases', () => {
    describe('CreateGameService - failed case when playerFoundResponse has failed', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(left(BadFormatInDatabaseError.create()))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('CreateGameService - failed case when playerFoundResponse has failed', async () => {
        // Arrange
        const request = {
          userCredential: PLAYER_X_CREDENTIALS,
          pieceType: PIECE_TYPE.X,
        }
        // Act
        const resultResponse = await myService.execute(request)
        // Assert
        expect(resultResponse.isLeft()).toBe(true)
        expect(resultResponse.value).toBeInstanceOf(InternalServerError)
      })
    })
    describe('CreateGameService - failed case when player in credential was not found in the system', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(undefined))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('CreateGameService - failed case when player in credential was not found in the system', async () => {
        // Arrange
        const request = {
          userCredential: PLAYER_X_CREDENTIALS,
          pieceType: PIECE_TYPE.X,
        }
        // Act
        const resultResponse = await myService.execute(request)
        // Assert
        expect(resultResponse.isLeft()).toBe(true)
        expect(resultResponse.value).toBeInstanceOf(PlayerNotFoundError)
      })
    })
  })
})
