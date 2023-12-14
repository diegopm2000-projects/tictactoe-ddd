import { inject, injectable } from 'inversify'

import { ICreateGameRequest, ICreateGameResponse } from '../ports/input/ICreateGame.service'
import { IUseCase } from '../../../shared/application/usecase'
import { TYPES } from '../../../shared/infrastructure/dependencyInjection/types'
import { IGameRepository } from '../ports/output/IGame.repository'
import { Game } from '../../domain/game'
import { InternalServerError } from '../../../auth/application/services/errors/InternalServerError'
import { left, right } from '../../../shared/domain/core/either'
import { PlayerNotFoundError } from '../errors/PlayerNotFoundError'
import { IPlayerRepository } from '../ports/output/IPlayer.repository'

@injectable()
export class CreateGameservice implements IUseCase<ICreateGameRequest, ICreateGameResponse> {
  constructor(
    @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
    @inject(TYPES.IPlayerRepository) private playerRepository: IPlayerRepository
  ) {}

  async execute(request: ICreateGameRequest): Promise<ICreateGameResponse> {
    const playerFoundResponse = await this.playerRepository.getOneById(request.userCredential.id)

    if (playerFoundResponse.isLeft()) {
      return left(InternalServerError.create())
    }

    const playerFound = playerFoundResponse.value

    if (!playerFound) {
      return left(PlayerNotFoundError.create(request.userCredential.id))
    }

    const game = Game.createNewGame({ player: playerFound, pieceType: request.pieceType })

    await this.gameRepository.save(game)

    return right(game.id)
  }
}
