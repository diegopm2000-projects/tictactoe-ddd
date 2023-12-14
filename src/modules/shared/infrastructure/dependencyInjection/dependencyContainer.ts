import { Container } from 'inversify'
import 'reflect-metadata'

import { ILoginService } from '../../../auth/application/ports/input/ILogin.service'
import { IRegisterService } from '../../../auth/application/ports/input/IRegister.service'
import { IHashHelper } from '../../../auth/application/ports/output/IHash.helper'
import { IUserRepository } from '../../../auth/application/ports/output/IUser.repository'
import { LoginService } from '../../../auth/application/services/login.service'
import { RegisterService } from '../../../auth/application/services/register.service'
import { HashHelper } from '../../../auth/infrastructure/helpers/MockHash.helper'
import { UserMemoryRepository } from '../../../auth/infrastructure/persistence/inMemory/User.memory.repository'
import { ICreateGameService } from '../../../tictactoe/application/ports/input/ICreateGame.service'
import { IJoinGameService } from '../../../tictactoe/application/ports/input/IJoinGame.service'
import { IGameRepository } from '../../../tictactoe/application/ports/output/IGame.repository'
import { IPlayerRepository } from '../../../tictactoe/application/ports/output/IPlayer.repository'
import { CreateGameservice } from '../../../tictactoe/application/services/CreateGame.service'
import { JoinGameservice } from '../../../tictactoe/application/services/JoinGame.service'
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

    return container
  }
}
