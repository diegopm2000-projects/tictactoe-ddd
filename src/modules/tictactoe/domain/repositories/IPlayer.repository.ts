import { IRepository } from '../../../shared/infrastructure/persistence/IRepository'
import { Player } from '../model/player'

export interface IPlayerRepository extends IRepository<Player> {}
