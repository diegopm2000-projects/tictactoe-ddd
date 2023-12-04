import { IRepository } from '../../../../shared/infrastructure/persistence/IRepository'
import { Player } from '../../../domain/player'

export interface IPlayerRepository extends IRepository<Player> {}
