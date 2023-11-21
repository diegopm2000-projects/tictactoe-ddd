import { Either } from '../../domain/core/either'
import { UniqueEntityID } from '../../domain/core/uniqueEntityID'
import { BadFormatInDatabaseError } from './errors/BadFormatInDatabaseError'

export interface IRepository<T> {
  save(obj: T): Promise<void>
  getOneById(id: UniqueEntityID): Promise<Either<BadFormatInDatabaseError, T | undefined>>
}
