import { Container } from 'inversify'
import 'reflect-metadata'

import { UserMemoryRepository } from '../../../../../../../src/modules/auth/infrastructure/persistence/inMemory/User.memory.repository'
import { HashHelper } from '../../../../../../../src/modules/auth/infrastructure/helpers/MockHash.helper'
import { TYPES } from '../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { ILoginResponse, ILoginService } from '../../../../../../../src/modules/auth/application/ports/input/ILogin.service'
import { DEFAULT_CONTAINER, DEFAULT_EMAIL, DEFAULT_USER } from '../../../../../expectations/expectations'
import { UserCredential } from '../../../../../../../src/modules/auth/domain/userCredential'
import { left, right } from '../../../../../../../src/modules/shared/domain/either'
import { BadFormatInDatabaseError } from '../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { InternalServerError } from '../../../../../../../src/modules/auth/application/services/errors/InternalServerError'
import { LoginError } from '../../../../../../../src/modules/auth/application/services/errors/LoginError'

// SUT
const myService = (DEFAULT_CONTAINER as Container).get<ILoginService>(TYPES.ILoginService)

const DEFAULT_SECRET = 'myUserSecret'

describe('LoginService - Tests', () => {
  describe('execute - Tests', () => {
    describe('execute - default successfully case', () => {
      beforeEach(() => {
        jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(right(DEFAULT_USER))
        jest.spyOn(HashHelper.prototype, 'compare').mockReturnValue(true)
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('execute - default successfully case', async () => {
        // Arrange
        const request = {
          email: DEFAULT_EMAIL.value,
          secret: DEFAULT_SECRET,
        }
        // Act
        const resultResponse: ILoginResponse = await myService.execute(request)
        // Assert
        expect(resultResponse.isRight()).toBe(true)
        const userCredential = <UserCredential>resultResponse.value
        expect(userCredential.id).toStrictEqual(DEFAULT_USER.id)
        expect(userCredential.email).toStrictEqual(DEFAULT_USER.email)
        expect(userCredential.nick).toStrictEqual(DEFAULT_USER.nick)
      })
    })
    describe('execute - failed cases', () => {
      describe('execute - failed case when in finding user was an error result', () => {
        beforeEach(() => {
          jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(left(BadFormatInDatabaseError.create()))
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('execute - failed case when in finding user was an error result', async () => {
          // Arrange
          const request = {
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_SECRET,
          }
          // Act
          const resultResponse: ILoginResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(InternalServerError)
        })
      })
      describe('execute - failed case when user was not found', () => {
        beforeEach(() => {
          jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(right(undefined))
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('execute - failed case when user was not found', async () => {
          // Arrange
          const request = {
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_SECRET,
          }
          // Act
          const resultResponse: ILoginResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(LoginError)
        })
      })
      describe('execute - failed case when user secret does not match with hashed secret stored in database', () => {
        beforeEach(() => {
          jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(right(DEFAULT_USER))
          jest.spyOn(HashHelper.prototype, 'compare').mockReturnValue(false)
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('execute - failed case when user secret does not match with hashed secret stored in database', async () => {
          // Arrange
          const request = {
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_SECRET,
          }
          // Act
          const resultResponse: ILoginResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(LoginError)
        })
      })
    })
  })
})
