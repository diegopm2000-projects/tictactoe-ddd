// SUT
import { UniqueEntityID, ErrorUuidNotValid } from '../../../../src/shared/domain/uniqueEntityID'
import { ALT_UUID_STR, DEFAULT_UUID_STR } from '../../expectations/expectations'

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
  describe('UuUniqueEntityIDid - Tests', () => {
    describe('create - Tests', () => {
      describe('create - successfully case', () => {
        it('create - successfully case', () => {
          // Arrange
          const uuidStr = DEFAULT_UUID_STR
          // Expected result
          const expectedId = uuidStr
          // Act
          const myUuid = UniqueEntityID.create(uuidStr)
          // Assert
          expect(myUuid.id).toBe(expectedId)
        })
      })
      describe('create - failed case', () => {
        it('create - failed case', () => {
          // Arrange
          const uuidStr = 'nonsense'
          // Expected error message
          const expectedErrorMessage = new ErrorUuidNotValid(uuidStr).message
          // Act
          try {
            UniqueEntityID.create(uuidStr)
            fail('It should not have come here!')
          } catch (error) {
            if (error instanceof Error) {
              // Assert
              expect(error.message).toBe(expectedErrorMessage)
            } else {
              fail('It should not have come here!')
            }
          }
        })
      })
    })

    describe('validate - Tests', () => {
      describe('validate - validated case ', () => {
        it('validate - validated case ', () => {
          // Arrange
          const uuidStr = DEFAULT_UUID_STR
          // Expected result
          const expectedResult = true
          // Act
          const result = UniqueEntityID.validate(uuidStr)
          // Assert
          expect(result).toBe(expectedResult)
        })
      })
      describe('validate - NOT validated case ', () => {
        it('validate - NOT validated case ', () => {
          // Arrange
          const uuidStr = 'nonsense'
          // Expected result
          const expectedResult = false
          // Act
          const result = UniqueEntityID.validate(uuidStr)
          // Assert
          expect(result).toBe(expectedResult)
        })
      })
    })

    describe('generate - Tests', () => {
      describe('generate - successfully case', () => {
        it('generate - successfully case', () => {
          // Arrange
          // N/A
          // Expected result
          const expectedId = DEFAULT_UUID_STR
          // Act
          const myUuid = UniqueEntityID.generate()
          // Assert
          expect(myUuid.id).toBe(expectedId)
        })
      })
    })

    describe('equals - Tests', () => {
      describe('equals - uuid are equals case', () => {
        it('equals - uuid are equals case', () => {
          // Arrange
          const myUuid = UniqueEntityID.create(DEFAULT_UUID_STR)
          const myUuid2 = UniqueEntityID.create(DEFAULT_UUID_STR)
          // Act
          const result = myUuid.equals(myUuid2)
          // Assert
          expect(result).toBe(true)
        })
      })
      describe('equals - uuid are NOT equals case', () => {
        it('equals - uuid are NOT equals case', () => {
          // Arrange
          const myUuid = UniqueEntityID.create(DEFAULT_UUID_STR)
          const myUuid2 = UniqueEntityID.create(ALT_UUID_STR)
          // Act
          const result = myUuid.equals(myUuid2)
          // Assert
          expect(result).toBe(false)
        })
      })
    })
  })
})
