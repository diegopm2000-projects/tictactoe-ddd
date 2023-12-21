import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { ICreateGameController } from './ICreateGame.controller'
import { ICreateGameService } from '../../../application/services/CreateGame/ICreateGame.service'

@injectable()
export class CreateGameController implements ICreateGameController {
  constructor(@inject(TYPES.ICreateGameService) private createGameService: ICreateGameService) {}

  async execute(req: Request, res: Response): Promise<void> {
    res.send('Hello CreateGame Controller!!!')
  }
}
