import express, { Application, Router, RequestHandler } from 'express'
import { Server } from 'http'

export enum HTTP_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class ExpressInfra {
  private _app?: Application
  private _server?: Server
  private _router?: Router
  private _port: number
  private _path: string

  public get port(): number {
    return this._port
  }

  public get path(): string {
    return this._path
  }

  private constructor(options?: { port?: number; path?: string }) {
    this._port = options?.port || 3000
    this._path = options?.path || '/'
  }

  private async startServer(app: express.Application, path: string): Promise<Server> {
    return new Promise((resolve, reject) => {
      try {
        console.log(`----> Starting server...`)
        const myServer = app.listen(this.port, () => {
          console.log(`----> 🚀 Server ready at http://localhost:${this.port}`)
          console.log(`----> API REST path at: http://localhost:${this.port}${path}`)
          console.log(`----> Server started OK!`)
          resolve(myServer)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async init(): Promise<boolean> {
    this._app = express()

    this._router = express.Router()
    this._app.use(this._path, this._router)

    this._app.use(express.json()) // Needed to parse body

    this._server = await this.startServer(this._app, this.path)

    return true
  }

  addRoute(params: { method: HTTP_METHOD; path: string; handler: RequestHandler }) {
    if (!this._server || !this._router) {
      throw new Error('Unable to add route. Server or router is not initialized!')
    }

    switch (params.method) {
      case HTTP_METHOD.GET:
        this._router.get(params.path, params.handler)
        break
      case HTTP_METHOD.POST:
        this._router.post(params.path, params.handler)
        break
      case HTTP_METHOD.PUT:
        this._router.put(params.path, params.handler)
        break
      case HTTP_METHOD.PATCH:
        this._router.patch(params.path, params.handler)
        break
      case HTTP_METHOD.DELETE:
        this._router.delete(params.path, params.handler)
        break
      default:
        throw new Error(`Unsupported HTTP method: ${params.method}`)
    }

    console.log(`----> Added route: ${params.method}, path: ${params.path}`)
  }

  static getInstance(params: { port: number; path: string }): ExpressInfra {
    return new ExpressInfra(params)
  }
}
