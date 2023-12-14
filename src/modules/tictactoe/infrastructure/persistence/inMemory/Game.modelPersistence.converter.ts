import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { CellNotValidError } from '../../../domain/errors/CellNotValidError'
import { GameCreationError } from '../../../domain/errors/GameCreationError'
import { Board } from '../../../domain/model/board'
import { Cell } from '../../../domain/model/cell'
import { Game } from '../../../domain/model/game'
import { PIECE_TYPE, Piece } from '../../../domain/model/piece'
import { Player } from '../../../domain/model/player'
import { Position } from '../../../domain/model/position'
import { GameModelPersistence } from './Game.modelPersistence'

type CellMdodelPersistenceToCellModelResponse = Either<CellNotValidError, Cell>

export type ModelPersistenceToModelResponse = Either<GameCreationError, Game>

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

  modelPersistenceToModel(mpCell: string): CellMdodelPersistenceToCellModelResponse {
    if (mpCell == '-') {
      return right(Cell.create())
    } else if (mpCell == 'X') {
      return right(Cell.create({ cell: Piece.create(PIECE_TYPE.X) }))
    } else if (mpCell == 'O') {
      return right(Cell.create({ cell: Piece.create(PIECE_TYPE.O) }))
    } else {
      return left(CellNotValidError.create(mpCell))
    }
  }

  static getInstance() {
    return new CellModelPersistenceConverter()
  }
}

export class GameModelPersistenceConverter {
  modelToModelPersistence(game: Game): GameModelPersistence {
    const cellMPConverter = CellModelPersistenceConverter.getInstance()

    const positionsArray = [Position.createPosition0(), Position.createPosition1(), Position.createPosition2()]

    const board: Array<Array<string>> = [[], [], []]

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = cellMPConverter.modelToModelPersistence(game.board.getCell(positionsArray[i], positionsArray[j]))
      }
    }

    return {
      id: game.id.value,
      idPlayerX: game.playerX?.id.value,
      idPlayerO: game.playerO?.id.value,
      board,
      status: game.status,
      turn: game.turn,
    }
  }

  modelPersistenceToModel(params: { gameMP: GameModelPersistence; playerX?: Player; playerO?: Player }): ModelPersistenceToModelResponse {
    // Obtaining the id

    const uniqueIdCreationResponse = UniqueEntityID.create(params.gameMP.id)
    if (uniqueIdCreationResponse.isLeft()) {
      return left(GameCreationError.create('Bad game id'))
    }

    const id = uniqueIdCreationResponse.value

    // Obtaining the board

    const cellMPConverter = CellModelPersistenceConverter.getInstance()

    const myArrayCells: Array<Array<Cell>> = [[], [], []]

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellResponse = cellMPConverter.modelPersistenceToModel(params.gameMP.board[i][j])
        if (cellResponse.isLeft()) {
          return left(GameCreationError.create(`Bad value found in a cell --> value: ${params.gameMP.board[i][j]}`))
        }
        myArrayCells[i][j] = cellResponse.value
      }
    }

    const boardCreationResponse = Board.create({
      arrayCells: myArrayCells,
    })

    const board = <Board>boardCreationResponse.value

    // Finally, creating the game

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
