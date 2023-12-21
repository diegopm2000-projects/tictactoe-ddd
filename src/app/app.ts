import { ExpressInfra, HTTP_METHOD } from '../modules/shared/infrastructure/express/Express.infra'

import { ILoginController } from '../modules/auth/ui/apirest/Login/ILogin.controller'
import { IRegisterController } from '../modules/auth/ui/apirest/Register/IRegister.controller'
import { DependencyContainer } from '../modules/shared/infrastructure/dependencyInjection/dependencyContainer'
import { TYPES } from '../modules/shared/infrastructure/dependencyInjection/types'
import { ICreateGameController } from '../modules/tictactoe/ui/apirest/CreateGame/ICreateGame.controller'
import { IJoinGameController } from '../modules/tictactoe/ui/apirest/JoinGame/IJoinGame.controller'
import { IMoveController } from '../modules/tictactoe/ui/apirest/Move/IMove.controller'

export class App {
  async init() {
    console.log('----> Initializing application...')

    // Dependency Container
    const container = DependencyContainer.init()

    // Express
    const expressInfra = ExpressInfra.getInstance({ port: 3000, path: '/' })
    await expressInfra.init()

    expressInfra.addRoute({
      method: HTTP_METHOD.POST,
      path: '/login',
      handler: (req, res) => container.get<ILoginController>(TYPES.ILoginController).execute(req, res),
    })
    expressInfra.addRoute({
      method: HTTP_METHOD.POST,
      path: '/register',
      handler: (req, res) => container.get<IRegisterController>(TYPES.IRegisterController).execute(req, res),
    })
    expressInfra.addRoute({
      method: HTTP_METHOD.POST,
      path: '/createGame',
      handler: (req, res) => container.get<ICreateGameController>(TYPES.ICreateGameController).execute(req, res),
    })
    expressInfra.addRoute({
      method: HTTP_METHOD.POST,
      path: '/joinGame',
      handler: (req, res) => container.get<IJoinGameController>(TYPES.IJoinGameController).execute(req, res),
    })
    expressInfra.addRoute({
      method: HTTP_METHOD.POST,
      path: '/move',
      handler: (req, res) => container.get<IMoveController>(TYPES.IMoveController).execute(req, res),
    })

    console.log('----> Application Initialized OK!')
  }

  static getInstance() {
    return new App()
  }
}
