import { inject, injectable } from 'inversify'
import { InternalServerError } from '../../../auth/application/services/errors/InternalServerError'
import { IUseCase } from '../../../shared/application/usecase'
import { left, right } from '../../../shared/domain/core/either'
import { TYPES } from '../../../shared/infrastructure/dependencyInjection/types'
import { GameNotFoundError } from '../errors/GameNotFoundError'
import { JoinNotPossibleError } from '../errors/JoinNotPossibleError'
import { PlayerNotFoundError } from '../errors/PlayerNotFoundError'
import { IJoinGameRequest, IJoinGameResponse } from '../ports/input/IJoinGame.service'
import { IGameRepository } from '../ports/output/IGame.repository'
import { IPlayerRepository } from '../ports/output/IPlayer.repository'

@injectable()
export class JoinGameservice implements IUseCase<IJoinGameRequest, IJoinGameResponse> {
  constructor(
    @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
    @inject(TYPES.IPlayerRepository) private playerRepository: IPlayerRepository
  ) {}

  async execute(request: IJoinGameRequest): Promise<IJoinGameResponse> {
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
