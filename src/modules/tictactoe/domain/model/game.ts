import { Either, left, right } from '../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../shared/domain/core/uniqueEntityID'
import { AggregateRoot } from '../../../shared/domain/core/aggregateRoot'
import { Board } from './board'
import { CellOccupiedError } from '../errors/CellOccupiedError'
import { GameHasFinishedError } from '../errors/GameHasFinishedError'
import { TurnNotValidError } from '../errors/TurnNotValidError'
import { PIECE_TYPE } from './piece'
import { Player } from './player'
import { Position } from './position'
import { WaitingPlayersError } from '../errors/WaitingPlayersError'
import { GameIsNotWaitingPlayerError } from '../errors/GameIsNotWaitingPlayerError'

type Point = { x: number; y: number }

const ALL_POSITIONS: Array<Point> = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]

const VICTORY_POSITIONS: Array<Array<Point>> = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ],
]

export enum GAME_STATUS {
  WAITING_PLAYERS = 'WAITING_PLAYERS',
  PLAYER_X_WINS = 'PLAYER_X_WINS',
  PLAYER_O_WINS = 'PLAYER_O_WINS',
  TIE = 'TIE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum GAME_TURN {
  TURN_X = 'TURN_X',
  TURN_O = 'TURN_O',
}

export type GameProps = {
  playerX?: Player
  playerO?: Player
  board: Board
  status: GAME_STATUS
  turn: GAME_TURN
}

export type GameConstructorParams = {
  playerX?: Player
  playerO?: Player
  board: Board
}

export type MoveResponse = Either<CellOccupiedError | GameHasFinishedError | TurnNotValidError, true>
export type JoinResponse = Either<GameIsNotWaitingPlayerError, true>

export class Game extends AggregateRoot<GameProps> {
  get playerX(): Player | undefined {
    return this.props.playerX
  }

  get playerO(): Player | undefined {
    return this.props.playerO
  }

  get board(): Board {
    return this.props.board
  }

  get status(): GAME_STATUS {
    return this.props.status
  }

  get turn(): GAME_TURN {
    return this.props.turn
  }

  private constructor(props: GameProps, id?: UniqueEntityID) {
    super(props, id)
  }

  private isXVictory(): boolean {
    return VICTORY_POSITIONS.some((group) =>
      group.every((point: Point) =>
        this.board.isXInCell(<Position>Position.create({ value: point.x }).value, <Position>Position.create({ value: point.y }).value)
      )
    )
  }

  private isOVictory(): boolean {
    return VICTORY_POSITIONS.some((group) =>
      group.every((point: Point) =>
        this.board.isOInCell(<Position>Position.create({ value: point.x }).value, <Position>Position.create({ value: point.y }).value)
      )
    )
  }

  private isTie(): boolean {
    return ALL_POSITIONS.every((point: Point) =>
      this.board.isOccupiedCell(<Position>Position.create({ value: point.x }).value, <Position>Position.create({ value: point.y }).value)
    )
  }

  private calculateStatus(): GAME_STATUS {
    if (this.playerX == undefined || this.playerO == undefined) {
      return GAME_STATUS.WAITING_PLAYERS
    } else if (this.isXVictory()) {
      return GAME_STATUS.PLAYER_X_WINS
    } else if (this.isOVictory()) {
      return GAME_STATUS.PLAYER_O_WINS
    } else if (this.isTie()) {
      return GAME_STATUS.TIE
    } else {
      return GAME_STATUS.IN_PROGRESS
    }
  }

  private calculateTurn(): GAME_TURN {
    const numberOfX = ALL_POSITIONS.filter((point: Point) =>
      this.board.isXInCell(<Position>Position.create({ value: point.x }).value, <Position>Position.create({ value: point.y }).value)
    ).length
    const numberOfO = ALL_POSITIONS.filter((point: Point) =>
      this.board.isOInCell(<Position>Position.create({ value: point.x }).value, <Position>Position.create({ value: point.y }).value)
    ).length

    if (numberOfX == 0 || numberOfX == numberOfO) {
      return GAME_TURN.TURN_X
    } else {
      return GAME_TURN.TURN_O
    }
  }

  public static create(
    params: {
      playerX?: Player
      playerO?: Player
      board: Board
    },
    id?: UniqueEntityID
  ): Game {
    const props = {
      ...params,
      status: GAME_STATUS.IN_PROGRESS, // Pass IN_PROGRESS Initially
      turn: GAME_TURN.TURN_X, // Pass TURN_X Initially
    }

    const game = new Game(props, id)

    // Calculate Status
    game.props.status = game.calculateStatus()
    // Calculate Turn
    game.props.turn = game.calculateTurn()

    return game
  }

  public static createNewGame(params: { player: Player; pieceType: PIECE_TYPE }) {
    const props = {
      board: Board.createNewEmptyBoard(),
      playerX: params.pieceType == PIECE_TYPE.X ? params.player : undefined,
      playerO: params.pieceType == PIECE_TYPE.O ? params.player : undefined,
      status: GAME_STATUS.WAITING_PLAYERS,
      turn: GAME_TURN.TURN_X,
    }

    return new Game(props)
  }

  public join(player: Player): JoinResponse {
    if (this.status != GAME_STATUS.WAITING_PLAYERS) {
      return left(GameIsNotWaitingPlayerError.create())
    }

    if (!this.playerX) {
      this.props.playerX = player
    } else {
      this.props.playerO = player
    }
    this.props.status = GAME_STATUS.IN_PROGRESS
    return right(true)
  }

  public move(pieceType: PIECE_TYPE, row: Position, column: Position): MoveResponse {
    if (this.status == GAME_STATUS.PLAYER_O_WINS || this.status == GAME_STATUS.PLAYER_X_WINS || this.status == GAME_STATUS.TIE) {
      return left(GameHasFinishedError.create())
    } else if (this.status == GAME_STATUS.WAITING_PLAYERS) {
      const missingPlayerPieceType = this.playerX == undefined ? PIECE_TYPE.X : PIECE_TYPE.O
      return left(WaitingPlayersError.create(missingPlayerPieceType))
    } else if ((pieceType == PIECE_TYPE.X && this.turn == GAME_TURN.TURN_O) || (pieceType == PIECE_TYPE.O && this.turn == GAME_TURN.TURN_X)) {
      return left(TurnNotValidError.create(pieceType))
    }

    const innerResponse = this.board.setPiece(pieceType, row, column)

    if (innerResponse.isLeft()) {
      return left(innerResponse.value)
    }

    // Calculate Status
    this.props.status = this.calculateStatus()
    // Calculate Turn
    this.props.turn = this.calculateTurn()

    return right(true)
  }
}
