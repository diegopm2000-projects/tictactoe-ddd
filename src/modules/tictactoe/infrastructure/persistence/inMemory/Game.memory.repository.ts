import { inject, injectable } from 'inversify'

import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { BadFormatInDatabaseError } from '../../../../shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { IGameRepository } from '../../../domain/repositories/IGame.repository'
import { GameModelPersistence } from './Game.modelPersistence'
import { GameModelPersistenceConverter } from './Game.modelPersistence.converter'
import { Game } from '../../../domain/model/game'
import { IPlayerRepository } from '../../../domain/repositories/IPlayer.repository'
import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { Player } from '../../../domain/model/player'

@injectable()
export class GameMemoryRepository implements IGameRepository {
  private _database: Array<GameModelPersistence> = []

  constructor(@inject(TYPES.IPlayerRepository) private playerRepository: IPlayerRepository) {}

  private innerObjConverter(params: { obj?: GameModelPersistence; playerX?: Player; playerO?: Player }): Either<BadFormatInDatabaseError, Game | undefined> {
    if (!params.obj) {
      return right(undefined)
    }

    const objConversionResponse = GameModelPersistenceConverter.getInstance().modelPersistenceToModel({
      gameMP: params.obj,
      playerX: params.playerX,
      playerO: params.playerO,
    })
    if (objConversionResponse.isLeft()) {
      return left(BadFormatInDatabaseError.create())
    }
    return right(objConversionResponse.value)
  }

  async save(objIn: Game): Promise<void> {
    return new Promise((resolve) => {
      const indexFound = this._database.findIndex((Game: GameModelPersistence) => Game.id == objIn.id.value)

      const GameModelPersistence = GameModelPersistenceConverter.getInstance().modelToModelPersistence(objIn)

      if (!indexFound) {
        this._database.push(GameModelPersistence)
      } else {
        this._database.splice(indexFound, 1, GameModelPersistence)
      }
      resolve()
    })
  }

  async getOneById(id: UniqueEntityID): Promise<Either<BadFormatInDatabaseError, Game | undefined>> {
    const objFound = this._database.find((Game: GameModelPersistence) => Game.id == id.value)

    let playerXFound: Player | undefined
    let playerOFound: Player | undefined

    if (objFound && objFound.idPlayerX) {
      const playerXIdCreationResponse = UniqueEntityID.create(objFound.idPlayerX)
      if (playerXIdCreationResponse.isLeft()) {
        return left(BadFormatInDatabaseError.create())
      }
      const playerXId = playerXIdCreationResponse.value
      const playerXFoundResponse = await this.playerRepository.getOneById(playerXId)
      if (playerXFoundResponse.isLeft()) {
        return left(BadFormatInDatabaseError.create())
      }
      playerXFound = playerXFoundResponse.value
    }

    if (objFound && objFound.idPlayerO) {
      const playerOIdCreationResponse = UniqueEntityID.create(objFound.idPlayerO)
      if (playerOIdCreationResponse.isLeft()) {
        return left(BadFormatInDatabaseError.create())
      }
      const playerOId = playerOIdCreationResponse.value
      const playerOFoundResponse = await this.playerRepository.getOneById(playerOId)
      if (playerOFoundResponse.isLeft()) {
        return left(BadFormatInDatabaseError.create())
      }
      playerOFound = playerOFoundResponse.value
    }

    return Promise.resolve(this.innerObjConverter({ obj: objFound, playerX: playerXFound, playerO: playerOFound }))
  }

  setDatabase(database: Array<GameModelPersistence>) {
    this._database = database
  }
}
