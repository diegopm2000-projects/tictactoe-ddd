import { IRepository } from '../../../../shared/infrastructure/persistence/IRepository'
import { Game } from '../../../domain/game'

// Mover los interfaces de repositorios al domain --> En arquitectura hexagonal los colocan ahí

export interface IGameRepository extends IRepository<Game> {}
