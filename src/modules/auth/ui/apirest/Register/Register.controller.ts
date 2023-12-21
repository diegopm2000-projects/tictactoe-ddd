import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { IRegisterService } from '../../../application/services/Register/IRegister.service'
import { IRegisterController } from './IRegister.controller'

@injectable()
export class RegisterController implements IRegisterController {
  constructor(@inject(TYPES.IRegisterService) private registerService: IRegisterService) {}

  async execute(req: Request, res: Response) {
    res.send('Hello Register Controller!!!')
  }
}
