import { inject, injectable } from 'inversify'

import { left, right } from '../../../../shared/domain/core/either'
import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { Game } from '../../../domain/model/game'
import { Player } from '../../../domain/model/player'
import { IGameRepository } from '../../../domain/repositories/IGame.repository'
import { IPlayerRepository } from '../../../domain/repositories/IPlayer.repository'
import { JoinNotPossibleError } from '../../errors/JoinNotPossibleError'
import { PlayerNotFoundError } from '../../errors/PlayerNotFoundError'
import { HandlerRepoUtil } from '../shared/handlerRepo.util'
import { IJoinGameRequest, IJoinGameResponse, IJoinGameService } from './IJoinGame.service'
import { GameNotFoundError } from '../../errors/GameNotFoundError'

@injectable()
export class JoinGameservice implements IJoinGameService {
  constructor(
    @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
    @inject(TYPES.IPlayerRepository) private playerRepository: IPlayerRepository
  ) {}

  async execute(request: IJoinGameRequest): Promise<IJoinGameResponse> {
    // Check that player associated to userCredential was found
    const playerRepoResponse = await this.playerRepository.getOneById(request.userCredential.id)

    const handledPlayerResponse = HandlerRepoUtil.getInstance<Player>().handleObjectWasFound(
      playerRepoResponse,
      PlayerNotFoundError.create(request.userCredential.id)
    )

    if (handledPlayerResponse.isLeft()) {
      return left(handledPlayerResponse.value)
    }
    const playerFound = handledPlayerResponse.value

    // Check that game was found
    const gameRepoResponse = await this.gameRepository.getOneById(request.idGame)

    const handledGameResponse = HandlerRepoUtil.getInstance<Game>().handleObjectWasFound(gameRepoResponse, GameNotFoundError.create(request.userCredential.id))

    if (handledGameResponse.isLeft()) {
      return left(handledGameResponse.value)
    }
    const gameFound = handledGameResponse.value

    // Execute the join
    const joinResponse = gameFound.join(playerFound)
    if (joinResponse.isLeft()) {
      return left(JoinNotPossibleError.create(joinResponse.value.message))
    }

    // Save the game
    await this.gameRepository.save(gameFound)

    // Returning the response
    return right(true)
  }
}
