import { Container } from 'inversify'
import 'reflect-metadata'

import { IHashHelper } from '../../../auth/application/helpers/IHash.helper'
import { ILoginService } from '../../../auth/application/services/Login/ILogin.service'
import { LoginService } from '../../../auth/application/services/Login/login.service'
import { IRegisterService } from '../../../auth/application/services/Register/IRegister.service'
import { RegisterService } from '../../../auth/application/services/Register/register.service'
import { IUserRepository } from '../../../auth/domain/repositories/IUser.repository'
import { HashHelper } from '../../../auth/infrastructure/helpers/MockHash.helper'
import { UserMemoryRepository } from '../../../auth/infrastructure/persistence/inMemory/User.memory.repository'
import { ILoginController } from '../../../auth/ui/apirest/Login/ILogin.controller'
import { LoginController } from '../../../auth/ui/apirest/Login/Login.controller'
import { IRegisterController } from '../../../auth/ui/apirest/Register/IRegister.controller'
import { RegisterController } from '../../../auth/ui/apirest/Register/Register.controller'
import { CreateGameservice } from '../../../tictactoe/application/services/CreateGame/CreateGame.service'
import { ICreateGameService } from '../../../tictactoe/application/services/CreateGame/ICreateGame.service'
import { IJoinGameService } from '../../../tictactoe/application/services/JoinGame/IJoinGame.service'
import { JoinGameservice } from '../../../tictactoe/application/services/JoinGame/JoinGame.service'
import { IMoveService } from '../../../tictactoe/application/services/Move/IMove.service'
import { MoveService } from '../../../tictactoe/application/services/Move/Move.service'
import { IGameRepository } from '../../../tictactoe/domain/repositories/IGame.repository'
import { IPlayerRepository } from '../../../tictactoe/domain/repositories/IPlayer.repository'
import { GameMemoryRepository } from '../../../tictactoe/infrastructure/persistence/inMemory/Game.memory.repository'
import { PlayerMemoryRepository } from '../../../tictactoe/infrastructure/persistence/inMemory/Player.memory.repository'
import { CreateGameController } from '../../../tictactoe/ui/apirest/CreateGame/CreateGame.controller'
import { ICreateGameController } from '../../../tictactoe/ui/apirest/CreateGame/ICreateGame.controller'
import { IJoinGameController } from '../../../tictactoe/ui/apirest/JoinGame/IJoinGame.controller'
import { JoinGameController } from '../../../tictactoe/ui/apirest/JoinGame/JoinGame.controller'
import { IMoveController } from '../../../tictactoe/ui/apirest/Move/IMove.controller'
import { MoveController } from '../../../tictactoe/ui/apirest/Move/Move.controller'
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
    // Controllers
    container.bind<ILoginController>(TYPES.ILoginController).to(LoginController)
    container.bind<IRegisterController>(TYPES.IRegisterController).to(RegisterController)
    container.bind<ICreateGameController>(TYPES.ICreateGameController).to(CreateGameController)
    container.bind<IJoinGameController>(TYPES.IJoinGameController).to(JoinGameController)
    container.bind<IMoveController>(TYPES.IMoveController).to(MoveController)

    return container
  }
}
