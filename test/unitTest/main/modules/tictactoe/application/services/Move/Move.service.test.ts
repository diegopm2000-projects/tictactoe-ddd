import { Container } from 'inversify'
import 'reflect-metadata'

import { InternalServerError } from '../../../../../../../../src/modules/auth/application/errors/InternalServerError'
import { left, right } from '../../../../../../../../src/modules/shared/domain/core/either'
import { TYPES } from '../../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { BadFormatInDatabaseError } from '../../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { ColumnPositionNotValidError } from '../../../../../../../../src/modules/tictactoe/application/errors/ColumnPositionNotValidError.'
import { GameNotFoundError } from '../../../../../../../../src/modules/tictactoe/application/errors/GameNotFoundError'
import { MovementNotValidError } from '../../../../../../../../src/modules/tictactoe/application/errors/MovementNotValidError'
import { PlayerNotFoundError } from '../../../../../../../../src/modules/tictactoe/application/errors/PlayerNotFoundError'
import { PlayerNotJoinedToGameError } from '../../../../../../../../src/modules/tictactoe/application/errors/PlayerNotJoinedToGameError'
import { RowPositionNotValidError } from '../../../../../../../../src/modules/tictactoe/application/errors/RowPositionNotValidError'
import { IMoveRequest, IMoveService } from '../../../../../../../../src/modules/tictactoe/application/services/Move/IMove.service'
import { Board } from '../../../../../../../../src/modules/tictactoe/domain/model/board'
import { Cell } from '../../../../../../../../src/modules/tictactoe/domain/model/cell'
import { Game } from '../../../../../../../../src/modules/tictactoe/domain/model/game'
import { PIECE_TYPE, Piece } from '../../../../../../../../src/modules/tictactoe/domain/model/piece'
import { GameMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { PlayerMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import {
  DEFAULT_CONTAINER,
  DEFAULT_UNIQUE_ID,
  EMPTY_BOARD,
  PLAYER_ALT,
  PLAYER_ALT_CREDENTIALS,
  PLAYER_O,
  PLAYER_O_CREDENTIALS,
  PLAYER_X,
  PLAYER_X_CREDENTIALS,
} from '../../../../../../expectations/expectations'

// SUT
const myService = (DEFAULT_CONTAINER as Container).get<IMoveService>(TYPES.IMoveService)

const DEFAULT_X_REQUEST: IMoveRequest = {
  userCredential: PLAYER_X_CREDENTIALS,
  idGame: DEFAULT_UNIQUE_ID,
  row: 0,
  col: 0,
}

const DEFAULT_O_REQUEST: IMoveRequest = {
  userCredential: PLAYER_O_CREDENTIALS,
  idGame: DEFAULT_UNIQUE_ID,
  row: 1,
  col: 1,
}

const DEFAULT_X_BAD_ROW_REQUEST: IMoveRequest = {
  userCredential: PLAYER_X_CREDENTIALS,
  idGame: DEFAULT_UNIQUE_ID,
  row: 4,
  col: 0,
}

const DEFAULT_X_BAD_COL_REQUEST: IMoveRequest = {
  userCredential: PLAYER_X_CREDENTIALS,
  idGame: DEFAULT_UNIQUE_ID,
  row: 0,
  col: 4,
}

const ALT_REQUEST: IMoveRequest = {
  userCredential: PLAYER_ALT_CREDENTIALS,
  idGame: DEFAULT_UNIQUE_ID,
  row: 0,
  col: 0,
}

const ALT_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}).value

describe('MoveService - Tests', () => {
  describe('MoveService - successfully cases', () => {
    describe('MoveService - default successfully case when is the turn of playerX', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(
          right(
            Game.create({
              playerX: PLAYER_X,
              playerO: PLAYER_O,
              board: Board.createNewEmptyBoard(),
            })
          )
        )
        jest.spyOn(GameMemoryRepository.prototype, 'save').mockResolvedValue()
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - default successfully case', async () => {
        // Arrange
        const request = DEFAULT_X_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isRight()).toBe(true)
        expect(moveResponse.value).toBe(true)
      })
    })
    describe('MoveService - default successfully case when is the turn of playerO', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_O))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(
          right(
            Game.create({
              playerX: PLAYER_X,
              playerO: PLAYER_O,
              board: ALT_BOARD,
            })
          )
        )
        jest.spyOn(GameMemoryRepository.prototype, 'save').mockResolvedValue()
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - default successfully case', async () => {
        // Arrange
        const request = DEFAULT_O_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isRight()).toBe(true)
        expect(moveResponse.value).toBe(true)
      })
    })
  })
  describe('MoveService - failed cases', () => {
    describe('MoveService - failed case when playerFoundResponse has failed', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(left(BadFormatInDatabaseError.create()))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - failed case when playerFoundResponse has failed', async () => {
        // Arrange
        const request = DEFAULT_X_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(InternalServerError)
      })
    })
    describe('MoveService - failed case when player in credential was not found in the system', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(undefined))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - failed case when player in credential was not found in the system', async () => {
        // Arrange
        const request = DEFAULT_X_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(PlayerNotFoundError)
      })
    })
    describe('MoveService - failed case when gameFoundResponse has failed', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(left(BadFormatInDatabaseError.create()))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - failed case when gameFoundResponse has failed', async () => {
        // Arrange
        const request = DEFAULT_X_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(InternalServerError)
      })
    })
    describe('MoveService - failed case when game in credential was not found in the system', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_X))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(undefined))
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - failed case when game in credential was not found in the system', async () => {
        // Arrange
        const request = DEFAULT_X_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(GameNotFoundError)
      })
    })
    describe('MoveService - failed case when player has not joined to the game', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_ALT))
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
      it('MoveService - failed case when player has not joined to the game', async () => {
        // Arrange
        const request = ALT_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(PlayerNotJoinedToGameError)
      })
    })
    describe('MoveService - failed case when row position is not valid', () => {
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
      it('MoveService - failed case when row position is not valid', async () => {
        // Arrange
        const request = DEFAULT_X_BAD_ROW_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(RowPositionNotValidError)
      })
    })
    describe('MoveService - failed case when col position is not valid', () => {
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
      it('MoveService - failed case when col position is not valid', async () => {
        // Arrange
        const request = DEFAULT_X_BAD_COL_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(ColumnPositionNotValidError)
      })
    })
    describe('MoveService - failed case when movement is not possible', () => {
      beforeEach(() => {
        jest.spyOn(PlayerMemoryRepository.prototype, 'getOneById').mockResolvedValue(right(PLAYER_O))
        jest.spyOn(GameMemoryRepository.prototype, 'getOneById').mockResolvedValue(
          right(
            Game.create({
              playerX: PLAYER_X,
              playerO: PLAYER_O,
              board: Board.createNewEmptyBoard(),
            })
          )
        )
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('MoveService - failed case when movement is not possible', async () => {
        // Arrange
        const request = DEFAULT_O_REQUEST
        // Act
        const moveResponse = await myService.execute(request)
        // Assert
        expect(moveResponse.isLeft()).toBe(true)
        expect(moveResponse.value).toBeInstanceOf(MovementNotValidError)
      })
    })
  })
})
