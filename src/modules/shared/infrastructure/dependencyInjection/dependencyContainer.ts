import { Container } from 'inversify'
import 'reflect-metadata'

import { IHashHelper } from '../../../auth/application/ports/output/IHash.helper'
import { HashHelper } from '../../../auth/infrastructure/helpers/MockHash.helper'
import { TYPES } from './types'
import { IUserRepository } from '../../../auth/application/ports/output/IUser.repository'
import { UserMemoryRepository } from '../../../auth/infrastructure/persistence/inMemory/User.memory.repository'
import { LoginService } from '../../../auth/application/services/login.service'
import { ILoginService } from '../../../auth/application/ports/input/ILogin.service'
import { RegisterService } from '../../../auth/application/services/register.service'
import { IRegisterService } from '../../../auth/application/ports/input/IRegister.service'

export class DependencyContainer {
  public static init(): Container {
    const container = new Container()

    // Helpers
    container.bind<IHashHelper>(TYPES.IHashHelper).to(HashHelper)
    // Repositories
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserMemoryRepository)
    // Services
    container.bind<ILoginService>(TYPES.ILoginService).to(LoginService)
    container.bind<IRegisterService>(TYPES.IRegisterService).to(RegisterService)

    return container
  }
}
