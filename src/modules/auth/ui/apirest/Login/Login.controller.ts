import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { ILoginService } from '../../../application/services/Login/ILogin.service'
import { ILoginController } from './ILogin.controller'

@injectable()
export class LoginController implements ILoginController {
  constructor(@inject(TYPES.ILoginService) private loginService: ILoginService) {}

  async execute(req: Request, res: Response): Promise<void> {
    res.send('Hello Login Controller!!!')
  }
}
