import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID, UuidNotValidError } from '../../../../shared/domain/core/uniqueEntityID'
import { Email } from '../../../../shared/domain/email'
import { Nick } from '../../../../shared/domain/nick'
import { IModelPersistenceConverter } from '../../../../shared/infrastructure/persistence/IModelPersistenceConverter'
import { EmailNotValidError } from '../../../domain/errors/EmailNotValidError'
import { NickNotValidError } from '../../../domain/errors/NickNotValidError'
import { Player } from '../../../domain/player'
import { PlayerModelPersistence } from './Player.modelPersistence'

export type ModelPersistenceToModelResponse = Either<UuidNotValidError | NickNotValidError | EmailNotValidError, Player>

export class PlayerModelPersistenceConverter implements IModelPersistenceConverter<Player, PlayerModelPersistence, ModelPersistenceToModelResponse> {
  modelToModelPersistence(player: Player): PlayerModelPersistence {
    return {
      id: player.id.value,
      nick: player.nick.value,
      email: player.email.value,
    }
  }

  modelPersistenceToModel(userModelPersistence: PlayerModelPersistence): ModelPersistenceToModelResponse {
    const uniqueIdCreationResponse = UniqueEntityID.create(userModelPersistence.id)
    if (uniqueIdCreationResponse.isLeft()) {
      return left(uniqueIdCreationResponse.value)
    }
    const nickCreationResponse = Nick.create({ value: userModelPersistence.nick })
    if (nickCreationResponse.isLeft()) {
      return left(nickCreationResponse.value)
    }
    const emailCreationResponse = Email.create({ value: userModelPersistence.email })
    if (emailCreationResponse.isLeft()) {
      return left(emailCreationResponse.value)
    }

    const email = emailCreationResponse.value
    const nick = nickCreationResponse.value

    return right(Player.create({ email, nick }, uniqueIdCreationResponse.value))
  }

  public static getInstance() {
    return new PlayerModelPersistenceConverter()
  }
}