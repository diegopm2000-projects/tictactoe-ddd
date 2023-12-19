import { Either } from '../../domain/core/either'
import { UniqueEntityID } from '../../domain/core/uniqueEntityID'
import { BadFormatInDatabaseError } from './errors/BadFormatInDatabaseError'

export type ObjectWasFoundResponse<T> = Either<BadFormatInDatabaseError, T | undefined>
export interface IRepository<T> {
  save(obj: T): Promise<void>
  getOneById(id: UniqueEntityID): Promise<ObjectWasFoundResponse<T>>
}
