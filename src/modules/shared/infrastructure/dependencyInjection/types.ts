export const TYPES = {
  // Helpers
  IHashHelper: Symbol.for('IHashHelper'),
  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
  IPlayerRepository: Symbol.for('IPlayerRepository'),
  IGameRepository: Symbol.for('IGameRepository'),
  // Service
  ILoginService: Symbol.for('ILoginService'),
  IRegisterService: Symbol.for('IRegisterService'),
  ICreateGameService: Symbol.for('ICreateGameService'),
  IJoinGameService: Symbol.for('IJoinGameService'),
  IMoveService: Symbol.for('IMoveService'),
}
