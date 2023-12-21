import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '../../../../shared/infrastructure/dependencyInjection/types'
import { IMoveController } from './IMove.controller'
import { IMoveService } from '../../../application/services/Move/IMove.service'

@injectable()
export class MoveController implements IMoveController {
  constructor(@inject(TYPES.IMoveService) private moveService: IMoveService) {}

  async execute(req: Request, res: Response): Promise<void> {
    res.send('Hello Move Controller!!!')
  }
}
