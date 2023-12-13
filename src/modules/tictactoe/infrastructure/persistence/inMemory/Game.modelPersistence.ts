export type GameModelPersistence = {
  id: string
  idPlayerX?: string
  idPlayerO?: string
  board: Array<Array<string>>
  status: string
  turn: string
}
