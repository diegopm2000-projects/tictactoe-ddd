import { Container } from 'inversify'
import 'reflect-metadata'

import { IRegisterResponse, IRegisterService } from '../../../../../../../src/modules/auth/application/ports/input/IRegister.service'
import { InputParamsInUserRegisterError } from '../../../../../../../src/modules/auth/application/services/errors/InputParamsInUserRegisterError'
import { InternalServerError } from '../../../../../../../src/modules/auth/application/services/errors/InternalServerError'
import { UserAlreadyRegisteredError } from '../../../../../../../src/modules/auth/application/services/errors/UserAlreadyRegisteredError'
import { HashHelper } from '../../../../../../../src/modules/auth/infrastructure/helpers/MockHash.helper'
import { UserMemoryRepository } from '../../../../../../../src/modules/auth/infrastructure/persistence/inMemory/User.memory.repository'
import { left, right } from '../../../../../../../src/modules/shared/domain/core/either'
import { TYPES } from '../../../../../../../src/modules/shared/infrastructure/dependencyInjection/types'
import { BadFormatInDatabaseError } from '../../../../../../../src/modules/shared/infrastructure/persistence/errors/BadFormatInDatabaseError'
import { DEFAULT_CONTAINER, DEFAULT_EMAIL, DEFAULT_HASHED_SECRET, DEFAULT_NICK, DEFAULT_USER } from '../../../../../expectations/expectations'

// SUT
const myService = (DEFAULT_CONTAINER as Container).get<IRegisterService>(TYPES.IRegisterService)

describe('RegisterService - Tests', () => {
  describe('execute - Tests', () => {
    describe('execute - default successfully case', () => {
      beforeEach(() => {
        jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(right(undefined))
        jest.spyOn(HashHelper.prototype, 'toHash').mockReturnValue(DEFAULT_HASHED_SECRET)
        jest.spyOn(UserMemoryRepository.prototype, 'save').mockResolvedValue()
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })
      it('execute - default successfully case', async () => {
        // Arrange
        const request = {
          nick: DEFAULT_NICK.value,
          email: DEFAULT_EMAIL.value,
          secret: DEFAULT_HASHED_SECRET,
        }
        // Act
        const resultResponse: IRegisterResponse = await myService.execute(request)
        // Assert
        expect(resultResponse.isRight()).toBe(true)
        const result = <boolean>resultResponse.value
        expect(result).toBe(true)
      })
    })
    describe('execute - failed cases', () => {
      describe('execute - failed case when nick passed is not valid', () => {
        it('execute - failed case when nick passed is not valid', async () => {
          // Arrange
          const request = {
            nick: '',
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_HASHED_SECRET,
          }
          // Act
          const resultResponse: IRegisterResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(InputParamsInUserRegisterError)
        })
      })
      describe('execute - failed case when email passed is not valid', () => {
        it('execute - failed case when email passed is not valid', async () => {
          // Arrange
          const request = {
            nick: DEFAULT_NICK.value,
            email: '',
            secret: DEFAULT_HASHED_SECRET,
          }
          // Act
          const resultResponse: IRegisterResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(InputParamsInUserRegisterError)
        })
      })
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
            nick: DEFAULT_NICK.value,
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_HASHED_SECRET,
          }
          // Act
          const resultResponse: IRegisterResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(InternalServerError)
        })
      })
      describe('execute - failed case when a use with the same email was found in database', () => {
        beforeEach(() => {
          jest.spyOn(UserMemoryRepository.prototype, 'getOneByEmail').mockResolvedValue(right(DEFAULT_USER))
        })
        afterEach(() => {
          jest.restoreAllMocks()
        })
        it('execute - failed case when a use with the same email was found in database', async () => {
          // Arrange
          const request = {
            nick: DEFAULT_NICK.value,
            email: DEFAULT_EMAIL.value,
            secret: DEFAULT_HASHED_SECRET,
          }
          // Act
          const resultResponse: IRegisterResponse = await myService.execute(request)
          // Assert
          expect(resultResponse.isLeft()).toBe(true)
          expect(resultResponse.value).toBeInstanceOf(UserAlreadyRegisteredError)
        })
      })
    })
  })
})
