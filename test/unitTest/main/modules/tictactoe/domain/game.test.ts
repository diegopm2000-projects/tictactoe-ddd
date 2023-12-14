import 'reflect-metadata'

import { Board } from '../../../../../../src/modules/tictactoe/domain/board'
import { Cell } from '../../../../../../src/modules/tictactoe/domain/cell'
import { CellOccupiedError } from '../../../../../../src/modules/tictactoe/domain/errors/CellOccupiedError'
import { GameHasFinishedError } from '../../../../../../src/modules/tictactoe/domain/errors/GameHasFinishedError'
import { TurnNotValidError } from '../../../../../../src/modules/tictactoe/domain/errors/TurnNotValidError'
import { WaitingPlayersError } from '../../../../../../src/modules/tictactoe/domain/errors/WaitingPlayersError'
import { PIECE_TYPE, Piece } from '../../../../../../src/modules/tictactoe/domain/piece'
import { Position } from '../../../../../../src/modules/tictactoe/domain/position'
import { EMPTY_BOARD, PLAYER_O, PLAYER_X } from '../../../../expectations/expectations'

// SUT
import { GAME_STATUS, GAME_TURN, Game } from '../../../../../../src/modules/tictactoe/domain/game'
import { GameIsNotWaitingPlayerError } from '../../../../../../src/modules/tictactoe/domain/errors/GameIsNotWaitingPlayerError'

const GAMING_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}).value

const PLAYER_X_WINS_GAME_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) })],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create(), Cell.create()],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create(), Cell.create()],
  ],
}).value

const PLAYER_O_WINS_GAME_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create()],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) })],
    [Cell.create(), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create()],
  ],
}).value

const TIE_GAME_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) })],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.X) })],
    [Cell.create({ cell: Piece.create(PIECE_TYPE.X) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) }), Cell.create({ cell: Piece.create(PIECE_TYPE.O) })],
  ],
}).value

describe('Game - Tests', () => {
  describe('create - Tests', () => {
    it('create - default successfully case', () => {
      // Arrange
      const params = {
        playerX: PLAYER_X,
        playerO: PLAYER_O,
        board: EMPTY_BOARD,
      }
      // Act
      const result = Game.create(params)
      // Assert
      expect(result).toBeInstanceOf(Game)
      expect(result.turn).toBe(GAME_TURN.TURN_X)
      expect(result.status).toBe(GAME_STATUS.IN_PROGRESS)
      expect(result.playerX).toStrictEqual(PLAYER_X)
      expect(result.playerO).toStrictEqual(PLAYER_O)
      expect(result.board).toStrictEqual(EMPTY_BOARD)
    })
  })

  describe('createNewGame - Tests', () => {
    it('createNewGame - successfully case when passing playerX', () => {
      // Arrange
      const params = {
        player: PLAYER_X,
        pieceType: PIECE_TYPE.X,
      }
      // Act
      const result = Game.createNewGame(params)
      // Assert
      expect(result).toBeInstanceOf(Game)
      expect(result.turn).toBe(GAME_TURN.TURN_X)
      expect(result.status).toBe(GAME_STATUS.WAITING_PLAYERS)
      expect(result.playerX).toStrictEqual(PLAYER_X)
      expect(result.playerO).toStrictEqual(undefined)
      expect(result.board.arrayCells).toStrictEqual(EMPTY_BOARD.arrayCells)
    })
    it('createNewGame - successfully case when passing playerO', () => {
      // Arrange
      const params = {
        player: PLAYER_O,
        pieceType: PIECE_TYPE.O,
      }
      // Act
      const result = Game.createNewGame(params)
      // Assert
      expect(result).toBeInstanceOf(Game)
      expect(result.turn).toBe(GAME_TURN.TURN_X)
      expect(result.status).toBe(GAME_STATUS.WAITING_PLAYERS)
      expect(result.playerX).toStrictEqual(undefined)
      expect(result.playerO).toStrictEqual(PLAYER_O)
      expect(result.board.arrayCells).toStrictEqual(EMPTY_BOARD.arrayCells)
    })
  })

  describe('join - Tests', () => {
    describe('join - successfully cases', () => {
      it('join - successfully case when playerX has already join', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          board: EMPTY_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const joinResult = myGame.join(PLAYER_O)
        // Assert
        expect(joinResult.isRight()).toBe(true)
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
      })
      it('join - successfully case when playerO has already join', () => {
        // Arrange
        const params = {
          playerO: PLAYER_O,
          board: EMPTY_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const joinResult = myGame.join(PLAYER_X)
        // Assert
        expect(joinResult.isRight()).toBe(true)
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
      })
    })
    describe('join - failed cases', () => {
      it('join - failed case when game does not accept more players', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: EMPTY_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const joinResult = myGame.join(PLAYER_X)
        // Assert
        expect(joinResult.isLeft()).toBe(true)
        expect(joinResult.value).toBeInstanceOf(GameIsNotWaitingPlayerError)
      })
    })
  })

  describe('move - Tests', () => {
    describe('move - sucessfully cases', () => {
      it('move - successfully case when turn is X', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: GAMING_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isRight())
        expect(myGame.board.isXInCell(Position.createPosition0(), Position.createPosition0()))
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_O)
      })
      it('move - successfully case when turn is O', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: GAMING_BOARD, // GAMING BOARD was modified in the previous move
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.O, Position.createPosition1(), Position.createPosition1())
        // Assert
        expect(result.isRight())
        expect(myGame.board.isXInCell(Position.createPosition0(), Position.createPosition0()))
        expect(myGame.board.isOInCell(Position.createPosition1(), Position.createPosition1()))
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_X)
      })
    })

    describe('move - failed cases', () => {
      it('move - failed case when turn is X and we try to move O', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: GAMING_BOARD, // GAMING BOARD was modified in the previous move
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.O, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(TurnNotValidError)
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_X)
      })
      it('move - failed case when turn is O and we try to move X', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: GAMING_BOARD, // GAMING BOARD was modified in the previous move
        }
        const myGame = Game.create(params)
        // Act
        const firstResult = myGame.move(PIECE_TYPE.X, Position.createPosition1(), Position.createPosition0())
        const secondResult = myGame.move(PIECE_TYPE.X, Position.createPosition1(), Position.createPosition0())
        // Assert
        expect(firstResult.isRight())
        expect(secondResult.value).toBeInstanceOf(TurnNotValidError)
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_O)
      })
      it('move - failed case when cell is occupied', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: GAMING_BOARD, // GAMING BOARD was modified in the previous move
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.O, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(CellOccupiedError)
        expect(myGame.status).toBe(GAME_STATUS.IN_PROGRESS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_O)
      })

      it('move - failed case when playerX has won the game', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: PLAYER_X_WINS_GAME_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.O, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(GameHasFinishedError)
        expect(myGame.status).toBe(GAME_STATUS.PLAYER_X_WINS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_O)
      })

      it('move - failed case when playerO has won the game', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: PLAYER_O_WINS_GAME_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(GameHasFinishedError)
        expect(myGame.status).toBe(GAME_STATUS.PLAYER_O_WINS)
        expect(myGame.turn).toBe(GAME_TURN.TURN_X)
      })

      it('move - failed case when is a tie game', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          playerO: PLAYER_O,
          board: TIE_GAME_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(GameHasFinishedError)
        expect(myGame.status).toBe(GAME_STATUS.TIE)
        expect(myGame.turn).toBe(GAME_TURN.TURN_O)
      })

      it('move - failed case when the game is waiting players (waiting for player_O', () => {
        // Arrange
        const params = {
          playerX: PLAYER_X,
          board: TIE_GAME_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(WaitingPlayersError)
      })

      it('move - failed case when the game is waiting players (waiting for player_X', () => {
        // Arrange
        const params = {
          playerO: PLAYER_O,
          board: TIE_GAME_BOARD,
        }
        const myGame = Game.create(params)
        // Act
        const result = myGame.move(PIECE_TYPE.X, Position.createPosition0(), Position.createPosition0())
        // Assert
        expect(result.isLeft())
        expect(result.value).toBeInstanceOf(WaitingPlayersError)
      })
    })
  })
})
