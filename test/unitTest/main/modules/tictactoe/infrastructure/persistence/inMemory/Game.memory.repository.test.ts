import 'reflect-metadata'

import { PlayerMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { GAME_STATUS, GAME_TURN, Game } from '../../../../../../../../src/modules/tictactoe/domain/game'
import { Board } from '../../../../../../../../src/modules/tictactoe/domain/board'
import { Cell } from '../../../../../../../../src/modules/tictactoe/domain/cell'
import { DEFAULT_UNIQUE_ID, DEFAULT_UUID_STR, PLAYER_O, PLAYER_O_UUID_STR, PLAYER_X, PLAYER_X_UUID_STR } from '../../../../../../expectations/expectations'

// SUT
import { GameMemoryRepository } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { BadFormatInDatabaseError } from '../../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'

const myPlayerRepository = new PlayerMemoryRepository()
myPlayerRepository.setDatabase([
  {
    id: PLAYER_X_UUID_STR,
    email: PLAYER_X.email.value,
    nick: 'playerX',
  },
  {
    id: PLAYER_O_UUID_STR,
    email: PLAYER_O.email.value,
    nick: 'playerO',
  },
])

const EMPTY_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}).value

const DEFAULT_GAME = Game.create(
  {
    playerX: PLAYER_X,
    playerO: PLAYER_O,
    board: EMPTY_BOARD,
  },
  DEFAULT_UNIQUE_ID
)

const DEFAULT_EMPTY_BOARD_MP = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-'],
]

describe('GameMemoryRepository - Tests', () => {
  describe('save - Tests', () => {
    let myGameMemoryRepository: GameMemoryRepository
    it('save - successfully case when player was found in the database (creation)', async () => {
      // Arrange
      myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
      // Act
      await myGameMemoryRepository.save(DEFAULT_GAME)
      // Assert
      const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Game)
    })
    it('save - successfully case when player was found in the database (update)', async () => {
      // Arrange
      // N/A
      // Act
      await myGameMemoryRepository.save(DEFAULT_GAME)
      // Assert
      const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
      expect(response.isRight()).toBe(true)
      expect(response.value).toBeInstanceOf(Game)
    })
  })
  describe('getOneById - Tests', () => {
    describe('getOneById - successfully cases', () => {
      it('getOneById - successfully case when game was NOT found', async () => {
        // Arrange
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isRight()).toBe(true)
        expect(response.value).toBe(undefined)
      })
      it('getOneById - successfully case when game was found', async () => {
        // Arrange
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: PLAYER_X_UUID_STR,
            idPlayerO: PLAYER_O_UUID_STR,
            board: DEFAULT_EMPTY_BOARD_MP,
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isRight()).toBe(true)
        expect(response.value).toBeInstanceOf(Game)
      })
    })
    describe('getOneById - failed cases', () => {
      it('getOneById - failed case when board is not valid', async () => {
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: PLAYER_X_UUID_STR,
            idPlayerO: PLAYER_O_UUID_STR,
            board: [
              ['bad', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-'],
            ],
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isLeft()).toBe(true)
        expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
      })
      it('getOneById - failed case when playerX id is not valid', async () => {
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: 'nonsense',
            idPlayerO: PLAYER_O_UUID_STR,
            board: DEFAULT_EMPTY_BOARD_MP,
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isLeft()).toBe(true)
        expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
      })
      it('getOneById - failed case when playerO id is not valid', async () => {
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepository)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: PLAYER_X_UUID_STR,
            idPlayerO: 'nonsense',
            board: DEFAULT_EMPTY_BOARD_MP,
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isLeft()).toBe(true)
        expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
      })
      it('getOneById - failed case when playerX is not valid in playerRepository', async () => {
        const myPlayerRepositoryAlt = new PlayerMemoryRepository()
        myPlayerRepositoryAlt.setDatabase([
          {
            id: PLAYER_X_UUID_STR,
            email: PLAYER_X.email.value,
            nick: 'bad',
          },
          {
            id: PLAYER_O_UUID_STR,
            email: PLAYER_O.email.value,
            nick: 'playerO',
          },
        ])
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepositoryAlt)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: PLAYER_X_UUID_STR,
            idPlayerO: PLAYER_O_UUID_STR,
            board: DEFAULT_EMPTY_BOARD_MP,
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isLeft()).toBe(true)
        expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
      })
      it('getOneById - failed case when playerO is not valid in playerRepository', async () => {
        const myPlayerRepositoryAlt = new PlayerMemoryRepository()
        myPlayerRepositoryAlt.setDatabase([
          {
            id: PLAYER_X_UUID_STR,
            email: PLAYER_X.email.value,
            nick: 'playerX',
          },
          {
            id: PLAYER_O_UUID_STR,
            email: PLAYER_O.email.value,
            nick: 'bad',
          },
        ])
        const myGameMemoryRepository = new GameMemoryRepository(myPlayerRepositoryAlt)
        myGameMemoryRepository.setDatabase([
          {
            id: DEFAULT_UUID_STR,
            idPlayerX: PLAYER_X_UUID_STR,
            idPlayerO: PLAYER_O_UUID_STR,
            board: DEFAULT_EMPTY_BOARD_MP,
            status: GAME_STATUS.IN_PROGRESS,
            turn: GAME_TURN.TURN_X,
          },
        ])
        // Act
        const response = await myGameMemoryRepository.getOneById(DEFAULT_UNIQUE_ID)
        // Assert
        expect(response.isLeft()).toBe(true)
        expect(response.value).toBeInstanceOf(BadFormatInDatabaseError)
      })
    })
  })
})
