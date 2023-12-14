import 'reflect-metadata'

import { Board } from '../../../../../../../../src/modules/tictactoe/domain/board'
import { Cell } from '../../../../../../../../src/modules/tictactoe/domain/cell'
import { GameCreationError } from '../../../../../../../../src/modules/tictactoe/domain/errors/GameCreationError'
import { GAME_STATUS, GAME_TURN, Game } from '../../../../../../../../src/modules/tictactoe/domain/game'
import { PIECE_TYPE, Piece } from '../../../../../../../../src/modules/tictactoe/domain/piece'
import { DEFAULT_UNIQUE_ID, DEFAULT_UUID_STR, PLAYER_O, PLAYER_O_UUID_STR, PLAYER_X, PLAYER_X_UUID_STR } from '../../../../../../expectations/expectations'

// SUT
import { GameModelPersistenceConverter } from '../../../../../../../../src/modules/tictactoe/infrastructure/persistence/inMemory/Game.modelPersistence.converter'

const TIE_GAME_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) })],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) })],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) })],
  ],
}).value

const EMPTY_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}).value

describe('GameModelPersistenceConverter - Tests', () => {
  describe('modelToModelPersistence - Tests', () => {
    it('modelToModelPersistence - successsfully case when all cells are filled', () => {
      // Arrange
      const myGame = Game.create(
        {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: TIE_GAME_BOARD,
        },
        DEFAULT_UNIQUE_ID
      )
      // Act
      const gameMP = GameModelPersistenceConverter.getInstance().modelToModelPersistence(myGame)
      // Assert
      expect(gameMP.id).toBe(DEFAULT_UNIQUE_ID.value)
    })
    it('modelToModelPersistence - successsfully case when all cells are empty', () => {
      // Arrange
      const myGame = Game.create(
        {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: EMPTY_BOARD,
        },
        DEFAULT_UNIQUE_ID
      )
      // Act
      const gameMP = GameModelPersistenceConverter.getInstance().modelToModelPersistence(myGame)
      // Assert
      expect(gameMP.id).toBe(DEFAULT_UNIQUE_ID.value)
    })
  })
  describe('modelPersistenceToModel - Tests', () => {
    describe('modelPersistenceToModel - successfully cases', () => {
      it('modelPersistenceToModel - successfully case when board is empty', () => {
        // Arrange
        const gameMP = {
          id: DEFAULT_UUID_STR,
          idPlayerX: PLAYER_X_UUID_STR,
          idPlayerO: PLAYER_O_UUID_STR,
          board: [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-'],
          ],
          status: GAME_STATUS.IN_PROGRESS,
          turn: GAME_TURN.TURN_X,
        }
        // Act
        const resultResponse = GameModelPersistenceConverter.getInstance().modelPersistenceToModel({ gameMP, playerX: PLAYER_X, playerO: PLAYER_O })
        // Assert
        expect(resultResponse.isRight())
        expect(resultResponse.value).toBeInstanceOf(Game)
      })
      it('modelPersistenceToModel - successfully case when board is filled', () => {
        // Arrange
        const gameMP = {
          id: DEFAULT_UUID_STR,
          idPlayerX: PLAYER_X_UUID_STR,
          idPlayerO: PLAYER_O_UUID_STR,
          board: [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X'],
          ],
          status: GAME_STATUS.TIE,
          turn: GAME_TURN.TURN_O,
        }
        // Act
        const resultResponse = GameModelPersistenceConverter.getInstance().modelPersistenceToModel({ gameMP, playerX: PLAYER_X, playerO: PLAYER_O })
        // Assert
        expect(resultResponse.isRight())
        expect(resultResponse.value).toBeInstanceOf(Game)
      })
    })
    it('modelPersistenceToModel - failed case when there is a cell in board that is not valid', () => {
      // Arrange
      const gameMP = {
        id: DEFAULT_UUID_STR,
        idPlayerX: PLAYER_X_UUID_STR,
        idPlayerO: PLAYER_O_UUID_STR,
        board: [['', '', ''], [], []],
        status: GAME_STATUS.IN_PROGRESS,
        turn: GAME_TURN.TURN_X,
      }
      // Act
      const resultResponse = GameModelPersistenceConverter.getInstance().modelPersistenceToModel({ gameMP, playerX: PLAYER_X, playerO: PLAYER_O })
      // Assert
      expect(resultResponse.isLeft())
      expect(resultResponse.value).toBeInstanceOf(GameCreationError)
    })
    it('modelPersistenceToModel - failed case when the game id is not valid', () => {
      // Arrange
      const gameMP = {
        id: 'nonsense',
        idPlayerX: PLAYER_X_UUID_STR,
        idPlayerO: PLAYER_O_UUID_STR,
        board: [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
        ],
        status: GAME_STATUS.IN_PROGRESS,
        turn: GAME_TURN.TURN_X,
      }
      // Act
      const resultResponse = GameModelPersistenceConverter.getInstance().modelPersistenceToModel({ gameMP, playerX: PLAYER_X, playerO: PLAYER_O })
      // Assert
      expect(resultResponse.isLeft())
      expect(resultResponse.value).toBeInstanceOf(GameCreationError)
    })
  })
})
