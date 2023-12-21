import { Request, Response } from 'express'

export interface IExpressController {
  execute(req: Request, response: Response): Promise<void>
}
