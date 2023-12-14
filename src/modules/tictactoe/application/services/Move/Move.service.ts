import { inject, injectable } from 'inversify'

import { left, right } from '../../../../shared/domain/core/either'
import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { PIECE_TYPE } from '../../../domain/model/piece'
import { Position } from '../../../domain/model/position'
import { ColumnPositionNotValidError } from '../../errors/ColumnPositionNotValidError.'
import { GameNotFoundError } from '../../errors/GameNotFoundError'
import { MovementNotValidError } from '../../errors/MovementNotValidError'
import { PlayerNotFoundError } from '../../errors/PlayerNotFoundError'
import { PlayerNotJoinedToGameError } from '../../errors/PlayerNotJoinedToGameError'
import { RowPositionNotValidError } from '../../errors/RowPositionNotValidError'
import { IMoveRequest, IMoveResponse, IMoveService } from './IMove.service'
import { IGameRepository } from '../../../domain/repositories/IGame.repository'
import { IPlayerRepository } from '../../../domain/repositories/IPlayer.repository'
import { InternalServerError } from '../../../../auth/application/errors/InternalServerError'

@injectable()
export class MoveService implements IMoveService {
  constructor(
    @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
    @inject(TYPES.IPlayerRepository) private playerRepository: IPlayerRepository
  ) {}

  async execute(request: IMoveRequest): Promise<IMoveResponse> {
    // Check that player associated to userCredential was found
    const playerFoundResponse = await this.playerRepository.getOneById(request.userCredential.id)
    if (playerFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }
    const playerFound = playerFoundResponse.value
    if (!playerFound) {
      return left(PlayerNotFoundError.create(request.userCredential.id))
    }

    // Check that game was found
    const gameFoundResponse = await this.gameRepository.getOneById(request.idGame)
    if (gameFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }

    const gameFound = gameFoundResponse.value
    if (!gameFound) {
      return left(GameNotFoundError.create(request.userCredential.id))
    }

    // Check that player has joined to the game
    let pieceType
    if (gameFound.playerX?.id.value == request.userCredential.id.value) {
      pieceType = PIECE_TYPE.X
    } else if (gameFound.playerO?.id.value == request.userCredential.id.value) {
      pieceType = PIECE_TYPE.O
    } else {
      return left(PlayerNotJoinedToGameError.create(request.userCredential.id))
    }

    // Check that position X (row) is valid
    const rowPositionResponse = Position.create({ value: request.row })
    if (rowPositionResponse.isLeft()) {
      return left(RowPositionNotValidError.create(request.row))
    }
    const rowPosition = rowPositionResponse.value

    // Check that position Y (column) is valid
    const columnPositionResponse = Position.create({ value: request.col })
    if (columnPositionResponse.isLeft()) {
      return left(ColumnPositionNotValidError.create(request.col))
    }
    const colPosition = columnPositionResponse.value

    // Execute the move
    const movementResponse = gameFound.move(pieceType, rowPosition, colPosition)
    if (movementResponse.isLeft()) {
      return left(MovementNotValidError.create(movementResponse.value.message))
    }

    // Save the game
    await this.gameRepository.save(gameFound)

    // Returning the response
    return right(true)
  }
}
