import { injectable } from 'inversify'

import { Either, left, right } from '../../../../shared/domain/core/either'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'
import { BadFormatInDatabaseError } from '../../../../shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { IUserRepository } from '../../../domain/repositories/IUser.repository'
import { User } from '../../../domain/model/user'
import { UserModelPersistence } from './User.modelPersistence'
import { UserModelPersistenceConverter } from './User.modelPersistence.converter'

@injectable()
export class UserMemoryRepository implements IUserRepository {
  private _database: Array<UserModelPersistence> = []

  private innerObjConverter(obj?: UserModelPersistence): Either<BadFormatInDatabaseError, User | undefined> {
    if (!obj) {
      return right(undefined)
    }
    const objConversionResponse = UserModelPersistenceConverter.getInstance().modelPersistenceToModel(obj)
    if (objConversionResponse.isLeft()) {
      return left(BadFormatInDatabaseError.create())
    }
    return right(objConversionResponse.value)
  }

  save(objIn: User): Promise<void> {
    return new Promise((resolve) => {
      const indexFound = this._database.findIndex((user: UserModelPersistence) => user.id == objIn.id.value)

      const userModelPersistence = UserModelPersistenceConverter.getInstance().modelToModelPersistence(objIn)

      if (!indexFound) {
        this._database.push(userModelPersistence)
      } else {
        this._database.splice(indexFound, 1, userModelPersistence)
      }
      resolve()
    })
  }

  getOneById(id: UniqueEntityID): Promise<Either<BadFormatInDatabaseError, User | undefined>> {
    const objFound = this._database.find((user: UserModelPersistence) => user.id == id.value)
    return Promise.resolve(this.innerObjConverter(objFound))
  }

  getOneByEmail(email: string): Promise<Either<BadFormatInDatabaseError, User | undefined>> {
    const objFound = this._database.find((user: UserModelPersistence) => user.email == email)
    return Promise.resolve(this.innerObjConverter(objFound))
  }

  setDatabase(database: Array<UserModelPersistence>) {
    this._database = database
  }
}
