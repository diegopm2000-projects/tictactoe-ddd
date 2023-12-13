import { Container } from 'inversify'
import 'reflect-metadata'

import { DEFAULT_CONTAINER, PLAYER_X, PLAYER_X_CREDENTIALS } from '../../../../../expectations/expectations'
import { TYPES } from '../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { ICreateGameService } from '../../../../../../../src/modules/tictactoe/application/ports/input/ICreateGame.service'
import { PIECE_TYPE } from '../../../../../../../src/modules/tictactoe/domain/piece'
import { right } from '../../../../../../../src/modules/shared/domain/core/either'
import { PlayerMemoryRepository } from '../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { GameMemoryRepository } from '../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'

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
    // TODO
  })
})
