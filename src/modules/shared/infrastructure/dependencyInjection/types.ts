export const TYPES = {
  // Helpers
  IHashHelper: Symbol.for('IHashHelper'),
  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
  IPlayerRepository: Symbol.for('IPlayerRepository'),
  IGameRepository: Symbol.for('IGameRepository'),
  // Services
  ILoginService: Symbol.for('ILoginService'),
  IRegisterService: Symbol.for('IRegisterService'),
  ICreateGameService: Symbol.for('ICreateGameService'),
  IJoinGameService: Symbol.for('IJoinGameService'),
  IMoveService: Symbol.for('IMoveService'),
  // Controllers
  ILoginController: Symbol.for('ILoginController'),
  IRegisterController: Symbol.for('IRegisterController'),
  ICreateGameController: Symbol.for('ICreateGameController'),
  IJoinGameController: Symbol.for('IJoinGameController'),
  IMoveController: Symbol.for('IMoveController'),
}
