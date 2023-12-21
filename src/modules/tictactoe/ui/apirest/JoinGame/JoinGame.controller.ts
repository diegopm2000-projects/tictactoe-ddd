import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { IJoinGameController } from './IJoinGame.controller'
import { IJoinGameService } from '../../../application/services/JoinGame/IJoinGame.service'

@injectable()
export class JoinGameController implements IJoinGameController {
  constructor(@inject(TYPES.IJoinGameService) private joinGameService: IJoinGameService) {}

  async execute(req: Request, res: Response): Promise<void> {
    res.send('Hello JoinGame Controller!!!')
  }
}
