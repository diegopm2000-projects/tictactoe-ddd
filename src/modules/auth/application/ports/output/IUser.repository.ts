import { Either } from '../../../../shared/domain/core/either'
import { IRepository } from '../../../../shared/infrastructure/persistence/IRepository'
import { BadFormatInDatabaseError } from '../../../../shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { User } from '../../../domain/user'

export interface IUserRepository extends IRepository<User> {
  getOneByEmail(email: string): Promise<Either<BadFormatInDatabaseError, User | undefined>>
}
