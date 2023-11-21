import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID, UuidNotValidError } from '../../../../shared/domain/core/uniqueEntityID'
import { IModelPersistenceConverter } from '../../../../shared/infrastructure/persistence/IModelPersistenceConverter'
import { Email } from '../../../../shared/domain/email'
import { EmailNotValidError } from '../../../../tictactoe/domain/errors/EmailNotValidError'
import { NickNotValidError } from '../../../../tictactoe/domain/errors/NickNotValidError'
import { Nick } from '../../../../shared/domain/nick'
import { User } from '../../../domain/user'
import { UserModelPersistence } from './User.modelPersistence'

export type ModelPersistenceToModelResponse = Either<UuidNotValidError | NickNotValidError | EmailNotValidError, User>

export class UserModelPersistenceConverter implements IModelPersistenceConverter<User, UserModelPersistence, ModelPersistenceToModelResponse> {
  modelToModelPersistence(user: User): UserModelPersistence {
    return {
      id: user.id.value,
      nick: user.nick.value,
      email: user.email.value,
      hashedSecret: user.hashedSecret,
    }
  }

  modelPersistenceToModel(userModelPersistence: UserModelPersistence): ModelPersistenceToModelResponse {
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

    const user = User.create(
      { email: emailCreationResponse.value, nick: nickCreationResponse.value, hashedSecret: userModelPersistence.hashedSecret },
      uniqueIdCreationResponse.value
    )
    return right(user)
  }

  public static getInstance() {
    return new UserModelPersistenceConverter()
  }
}
