import { Container } from 'inversify'
import 'reflect-metadata'

import { ILoginService } from '../../../auth/application/services/Login/ILogin.service'
import { IRegisterService } from '../../../auth/application/services/Register/IRegister.service'
import { IHashHelper } from '../../../auth/application/helpers/IHash.helper'
import { IUserRepository } from '../../../auth/domain/repositories/IUser.repository'
import { LoginService } from '../../../auth/application/services/Login/login.service'
import { RegisterService } from '../../../auth/application/services/Register/register.service'
import { HashHelper } from '../../../auth/infrastructure/helpers/MockHash.helper'
import { UserMemoryRepository } from '../../../auth/infrastructure/persistence/inMemory/User.memory.repository'
import { ICreateGameService } from '../../../tictactoe/application/services/CreateGame/ICreateGame.service'
import { IJoinGameService } from '../../../tictactoe/application/services/JoinGame/IJoinGame.service'
import { IMoveService } from '../../../tictactoe/application/services/Move/IMove.service'
import { IGameRepository } from '../../../tictactoe/domain/repositories/IGame.repository'
import { IPlayerRepository } from '../../../tictactoe/domain/repositories/IPlayer.repository'
import { CreateGameservice } from '../../../tictactoe/application/services/CreateGame/CreateGame.service'
import { JoinGameservice } from '../../../tictactoe/application/services/JoinGame/JoinGame.service'
import { MoveService } from '../../../tictactoe/application/services/Move/Move.service'
import { GameMemoryRepository } from '../../../tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { PlayerMemoryRepository } from '../../../tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { TYPES } from './types'

export class DependencyContainer {
  public static init(): Container {
    const container = new Container()

    // Helpers
    container.bind<IHashHelper>(TYPES.IHashHelper).to(HashHelper)
    // Repositories
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserMemoryRepository)
    container.bind<IGameRepository>(TYPES.IGameRepository).to(GameMemoryRepository)
    container.bind<IPlayerRepository>(TYPES.IPlayerRepository).to(PlayerMemoryRepository)
    // Services
    container.bind<ILoginService>(TYPES.ILoginService).to(LoginService)
    container.bind<IRegisterService>(TYPES.IRegisterService).to(RegisterService)
    container.bind<ICreateGameService>(TYPES.ICreateGameService).to(CreateGameservice)
    container.bind<IJoinGameService>(TYPES.IJoinGameService).to(JoinGameservice)
    container.bind<IMoveService>(TYPES.IMoveService).to(MoveService)

    return container
  }
}
