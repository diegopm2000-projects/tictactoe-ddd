import { Board } from '../../../../../../src/modules/tictactoe/domain/board'
import { Cell } from '../../../../../../src/modules/tictactoe/domain/cell'
import { CellOccupiedError } from '../../../../../../src/modules/tictactoe/domain/errors/CellOccupiedError'
import { GameHasFinishedError } from '../../../../../../src/modules/tictactoe/domain/errors/GameHasFinishedError'
import { TurnNotValidError } from '../../../../../../src/modules/tictactoe/domain/errors/TurnNotValidError'
import { PIECE_TYPE, Piece } from '../../../../../../src/modules/tictactoe/domain/piece'
import { Player } from '../../../../../../src/modules/tictactoe/domain/player'
import { Position } from '../../../../../../src/modules/tictactoe/domain/position'

// SUT
import { GAME_STATUS, GAME_TURN, Game } from '../../../../../../src/modules/tictactoe/domain/game'

const PLAYER_X: Player = <Player>Player.create({ email: 'playerX@mail.com', nick: 'playerX' }).value
const PLAYER_O: Player = <Player>Player.create({ email: 'playerO@mail.com', nick: 'playerO' }).value

const EMPTY_BOARD: Board = <Board>Board.create({
  arrayCells: [
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
    [Cell.create(), Cell.create(), Cell.create()],
  ],
}).value

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
    })
  })
})
