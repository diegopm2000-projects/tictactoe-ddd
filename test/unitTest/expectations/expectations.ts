import { User } from '../../../src/modules/auth/domain/user'
import { MOCK_HASHED_SECRET } from '../../../src/modules/auth/infrastructure/helpers/MockHash.helper'
import { UniqueEntityID } from '../../../src/modules/shared/domain/uniqueEntityID'
import { DependencyContainer } from '../../../src/modules/shared/infrastructure/dependencyInjection/dependencyContainer'
import { Email } from '../../../src/modules/tictactoe/domain/email'
import { Nick } from '../../../src/modules/tictactoe/domain/nick'

// Depency Injection Container

export const DEFAULT_CONTAINER = DependencyContainer.init()

// Message Tests

export const MESSAGE_TEST_FAILED = 'it should not reach here'

// UUIDs

export const DEFAULT_UUID_STR = '0caaf0d6-d90e-4aea-9d4a-1279536a09bc'
export const ALT_UUID_STR = 'b3057db7-adb3-4fc1-9c7e-4d22e9143c4f'

// ////////////////////////////////////////////////////////////////////
// DOMAIN OBJECTS
// ////////////////////////////////////////////////////////////////////

export const DEFAULT_EMAIL: Email = <Email>Email.create({ value: 'user@mail.com' }).value
export const DEFAULT_NICK: Nick = <Nick>Nick.create({ value: 'alias' }).value
export const DEFAULT_HASHED_SECRET = MOCK_HASHED_SECRET
export const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value
export const ALT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(ALT_UUID_STR).value

export const DEFAULT_USER: User = <User>User.create({ email: DEFAULT_EMAIL, nick: DEFAULT_NICK, hashedSecret: DEFAULT_HASHED_SECRET }, DEFAULT_ID)
