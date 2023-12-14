import { injectable } from 'inversify'

import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { BadFormatInDatabaseError } from '../../../../shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { IPlayerRepository } from '../../../application/ports/output/IPlayer.repository'
import { Player } from '../../../../../../src/modules/tictactoe/domain/player'
import { PlayerModelPersistence } from './Player.modelPersistence'
import { PlayerModelPersistenceConverter } from './Player.modelPersistence.converter'

@injectable()
export class PlayerMemoryRepository implements IPlayerRepository {
  private _database: Array<PlayerModelPersistence> = []

  private innerObjConverter(obj?: PlayerModelPersistence): Either<BadFormatInDatabaseError, Player | undefined> {
    if (!obj) {
      return right(undefined)
    }
    const objConversionResponse = PlayerModelPersistenceConverter.getInstance().modelPersistenceToModel(obj)
    if (objConversionResponse.isLeft()) {
      return left(BadFormatInDatabaseError.create())
    }
    return right(objConversionResponse.value)
  }

  async save(objIn: Player): Promise<void> {
    return new Promise((resolve) => {
      const indexFound = this._database.findIndex((Player: PlayerModelPersistence) => Player.id == objIn.id.value)

      const PlayerModelPersistence = PlayerModelPersistenceConverter.getInstance().modelToModelPersistence(objIn)

      if (!indexFound) {
        this._database.push(PlayerModelPersistence)
      } else {
        this._database.splice(indexFound, 1, PlayerModelPersistence)
      }
      resolve()
    })
  }

  async getOneById(id: UniqueEntityID): Promise<Either<BadFormatInDatabaseError, Player | undefined>> {
    const objFound = this._database.find((player: PlayerModelPersistence) => player.id == id.value)
    return Promise.resolve(this.innerObjConverter(objFound))
  }

  async getOneByEmail(email: string): Promise<Either<BadFormatInDatabaseError, Player | undefined>> {
    const objFound = this._database.find((Player: PlayerModelPersistence) => Player.email == email)
    return Promise.resolve(this.innerObjConverter(objFound))
  }

  setDatabase(database: Array<PlayerModelPersistence>) {
    this._database = database
  }
}
