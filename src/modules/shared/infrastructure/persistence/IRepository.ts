import { Either } from '../../domain/either'
import { UniqueEntityID } from '../../domain/uniqueEntityID'
import { BadFormatInDatabaseError } from './errors/BadFormatInDatabaseError'

export interface IRepository<T> {
  save(obj: T): Promise<void>
  getOneById(id: UniqueEntityID): Promise<Either<BadFormatInDatabaseError, T | undefined>>
}
