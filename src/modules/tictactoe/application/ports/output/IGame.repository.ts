import { IRepository } from '../../../../shared/infrastructure/persistence/IRepository'
import { Game } from '../../../domain/game'

export interface IGameRepository extends IRepository<Game> {}
