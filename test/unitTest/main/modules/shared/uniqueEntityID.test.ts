import 'reflect-metadata'

import { ALT_UUID_STR, DEFAULT_UUID_STR, MESSAGE_TEST_FAILED } from '../../../expectations/expectations'

// SUT
import { UniqueEntityID, UuidNotValidError } from '../../../../../src/modules/shared/domain/uniqueEntityID'

// MOCKS
jest.mock('uuid', () => {
  const originalModule = jest.requireActual('uuid')

  return {
    __esModule: true,
    ...originalModule,
    v4: () => DEFAULT_UUID_STR,
  }
})

describe('UniqueEntityID - Tests', () => {
  describe('create - Tests', () => {
    describe('create - successfully case', () => {
      it('create - successfully case', () => {
        // Arrange
        const uuidStr = DEFAULT_UUID_STR
        // Act
        const uuidCreationResponse = UniqueEntityID.create(uuidStr)
        // Assert
        expect(uuidCreationResponse.isRight()).toBe(true)
        expect((<UniqueEntityID>uuidCreationResponse.value)?.value).toBe(uuidStr)
      })
    })
    describe('create - failed case', () => {
      it('create - failed case', () => {
        // Arrange
        const uuidStr = 'nonsense'
        // Act
        const uuidCreationResponse = UniqueEntityID.create(uuidStr)
        // Assert
        expect(uuidCreationResponse.isLeft()).toBe(true)
        expect(uuidCreationResponse.value).toBeInstanceOf(UuidNotValidError)
      })
    })
  })

  describe('validate - Tests', () => {
    describe('validate - validated case ', () => {
      it('validate - validated case ', () => {
        // Arrange
        const uuidStr = DEFAULT_UUID_STR
        // Act
        const result = UniqueEntityID.validate(uuidStr)
        // Assert
        expect(result).toBe(true)
      })
    })
    describe('validate - NOT validated case ', () => {
      it('validate - NOT validated case ', () => {
        // Arrange
        const uuidStr = 'nonsense'
        // Act
        const result = UniqueEntityID.validate(uuidStr)
        // Assert
        expect(result).toBe(false)
      })
    })
  })

  describe('generate - Tests', () => {
    describe('generate - successfully case', () => {
      it('generate - successfully case', () => {
        // Arrange
        // N/A
        // Act
        const result = UniqueEntityID.generate()
        // Assert
        expect(result.value).toBe(DEFAULT_UUID_STR)
      })
    })
  })

  describe('equals - Tests', () => {
    describe('equals - uuid are equals case', () => {
      it('equals - uuid are equals case', () => {
        // Arrange
        const uuidCreationResponse1 = UniqueEntityID.create(DEFAULT_UUID_STR)
        const uuidCreationResponse2 = UniqueEntityID.create(DEFAULT_UUID_STR)
        // Act
        if (uuidCreationResponse1.isLeft() || uuidCreationResponse2.isLeft()) {
          fail(MESSAGE_TEST_FAILED)
        }
        const uuid1: UniqueEntityID = <UniqueEntityID>uuidCreationResponse1.value
        const uuid2: UniqueEntityID = <UniqueEntityID>uuidCreationResponse2.value

        const result = uuid1.equals(uuid2)
        // Assert
        expect(result).toBe(true)
      })
    })
    describe('equals - uuid are NOT equals case', () => {
      it('equals - uuid are NOT equals case', () => {
        // Arrange
        const uuidCreationResponse1 = UniqueEntityID.create(DEFAULT_UUID_STR)
        const uuidCreationResponse2 = UniqueEntityID.create(ALT_UUID_STR)
        // Act
        if (uuidCreationResponse1.isLeft() || uuidCreationResponse2.isLeft()) {
          fail(MESSAGE_TEST_FAILED)
        }
        const uuid1: UniqueEntityID = <UniqueEntityID>uuidCreationResponse1.value
        const uuid2: UniqueEntityID = <UniqueEntityID>uuidCreationResponse2.value

        const result = uuid1.equals(uuid2)
        // Assert
        expect(result).toBe(false)
      })
    })
  })
})
