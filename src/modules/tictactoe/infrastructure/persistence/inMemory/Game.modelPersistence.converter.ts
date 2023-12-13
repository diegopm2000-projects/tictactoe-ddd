import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID, UuidNotValidError } from '../../../../shared/domain/core/uniqueEntityID'
import { Board } from '../../../domain/board'
import { Cell } from '../../../domain/cell'
import { BoardCreationError } from '../../../domain/errors/BoardCreationError'
import { EmailNotValidError } from '../../../domain/errors/EmailNotValidError'
import { NickNotValidError } from '../../../domain/errors/NickNotValidError'
import { Game } from '../../../domain/game'
import { PIECE_TYPE, Piece } from '../../../domain/piece'
import { Player } from '../../../domain/player'
import { GameModelPersistence } from './Game.modelPersistence'
import { Position } from '../../../domain/position'

export type ModelPersistenceToModelResponse = Either<UuidNotValidError | NickNotValidError | EmailNotValidError | BoardCreationError, Game>

class CellModelPersistenceConverter {
  modelToModelPersistence(cell: Cell): string {
    if (cell.isEmpty()) {
      return '-'
    } else if (cell.isXInCell()) {
      return 'X'
    } else {
      return 'O'
    }
  }

  modelPersistenceToModel(mpCell: string): Cell {
    if (mpCell == '-') {
      return Cell.create()
    } else if (mpCell == 'X') {
      return Cell.create({ cell: Piece.create(PIECE_TYPE.X) })
    } else {
      return Cell.create({ cell: Piece.create(PIECE_TYPE.O) })
    }
  }

  static getInstance() {
    return new CellModelPersistenceConverter()
  }
}

export class GameModelPersistenceConverter {
  modelToModelPersistence(game: Game): GameModelPersistence {
    const cellMPConverter = CellModelPersistenceConverter.getInstance()
    const POS_0 = Position.createPosition0()
    const POS_1 = Position.createPosition1()
    const POS_2 = Position.createPosition2()

    return {
      id: game.id.value,
      idPlayerX: game.playerX?.id.value,
      idPlayerO: game.playerO?.id.value,
      board: [
        [
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_0, POS_0)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_0, POS_1)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_0, POS_2)),
        ],
        [
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_1, POS_0)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_1, POS_1)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_1, POS_2)),
        ],
        [
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_2, POS_0)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_2, POS_1)),
          cellMPConverter.modelToModelPersistence(game.board.getCell(POS_2, POS_2)),
        ],
      ],
      status: game.status,
      turn: game.turn,
    }
  }

  modelPersistenceToModel(params: { gameMP: GameModelPersistence; playerX?: Player; playerO?: Player }): ModelPersistenceToModelResponse {
    // Obtaining the id
    const uniqueIdCreationResponse = UniqueEntityID.create(params.gameMP.id)
    if (uniqueIdCreationResponse.isLeft()) {
      return left(uniqueIdCreationResponse.value)
    }

    const id = uniqueIdCreationResponse.value

    // Obtaining the board

    const cellMPConverter = CellModelPersistenceConverter.getInstance()

    const boardCreationResponse = Board.create({
      arrayCells: [
        [
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[0][0]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[0][1]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[0][2]),
        ],
        [
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[1][0]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[1][1]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[1][2]),
        ],
        [
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[2][0]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[2][1]),
          cellMPConverter.modelPersistenceToModel(params.gameMP.board[2][2]),
        ],
      ],
    })

    if (boardCreationResponse.isLeft()) {
      return left(boardCreationResponse.value)
    }

    const board = boardCreationResponse.value

    const game = Game.create(
      {
        playerX: params.playerX,
        playerO: params.playerO,
        board,
      },
      id
    )

    return right(game)
  }

  public static getInstance() {
    return new GameModelPersistenceConverter()
  }
}
