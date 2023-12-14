import { User } from '../../../src/modules/auth/domain/user'
import { UserCredential } from '../../../src/modules/auth/domain/userCredential'
import { MOCK_HASHED_SECRET } from '../../../src/modules/auth/infrastructure/helpers/MockHash.helper'
import { UniqueEntityID } from '../../../src/modules/shared/domain/core/uniqueEntityID'
import { Email } from '../../../src/modules/shared/domain/email'
import { Nick } from '../../../src/modules/shared/domain/nick'
import { DependencyContainer } from '../../../src/modules/shared/infrastructure/dependencyInjection/dependencyContainer'
import { Game } from '../../../src/modules/tictactoe/domain/game'
import { PIECE_TYPE } from '../../../src/modules/tictactoe/domain/piece'
import { Player } from '../../../src/modules/tictactoe/domain/player'

// Depency Injection Container

export const DEFAULT_CONTAINER = DependencyContainer.init()

// Message Tests

export const MESSAGE_TEST_FAILED = 'it should not reach here'

// UUIDs

export const DEFAULT_UUID_STR = '0caaf0d6-d90e-4aea-9d4a-1279536a09bc'
export const ALT_UUID_STR = 'b3057db7-adb3-4fc1-9c7e-4d22e9143c4f'
export const PLAYER_X_UUID_STR = 'bdc420e8-9a58-11ee-b9d1-0242ac120002'
export const PLAYER_O_UUID_STR = 'c3522b2c-9a58-11ee-b9d1-0242ac120002'

export const DEFAULT_UNIQUE_ID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value
export const ALT_UNIQUE_ID = <UniqueEntityID>UniqueEntityID.create(ALT_UUID_STR).value

// CREDENTIALS

export const PLAYER_X_EMAIL: Email = <Email>Email.create({ value: 'playerX@mail.com' }).value
export const PLAYER_X_NICK: Nick = <Nick>Nick.create({ value: 'playerX' }).value
export const PLAYER_X_CREDENTIALS = UserCredential.create({ email: PLAYER_X_EMAIL, nick: PLAYER_X_NICK })

export const PLAYER_O_EMAIL: Email = <Email>Email.create({ value: 'playerO@mail.com' }).value
export const PLAYER_O_NICK: Nick = <Nick>Nick.create({ value: 'playerO' }).value
export const PLAYER_O_CREDENTIALS = UserCredential.create({ email: PLAYER_X_EMAIL, nick: PLAYER_X_NICK })

// ////////////////////////////////////////////////////////////////////
// DOMAIN OBJECTS
// ////////////////////////////////////////////////////////////////////

export const DEFAULT_EMAIL: Email = <Email>Email.create({ value: 'user@mail.com' }).value
export const DEFAULT_NICK: Nick = <Nick>Nick.create({ value: 'alias' }).value
export const DEFAULT_HASHED_SECRET = MOCK_HASHED_SECRET
export const PLAYER_X_UNIQUE_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(PLAYER_X_UUID_STR).value
export const PLAYER_O_UNIQUE_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(PLAYER_O_UUID_STR).value

export const DEFAULT_USER: User = <User>User.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK, hashedSecret: DEFAULT_HASHED_SECRET }, DEFAULT_UNIQUE_ID)

export const PLAYER_X: Player = Player.create({ email: PLAYER_X_EMAIL, nick: PLAYER_X_NICK }, PLAYER_X_UNIQUE_ID)
export const PLAYER_O: Player = Player.create({ email: PLAYER_O_EMAIL, nick: PLAYER_O_NICK }, PLAYER_O_UNIQUE_ID)

export const DEFAULT_GAME: Game = <Game>Game.createNewGame({ player: PLAYER_X, pieceType: PIECE_TYPE.X })
