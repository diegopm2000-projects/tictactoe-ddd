// SUT
import { ValueObject } from '../../../../../../../src/modules/shared/domain/core/valueObject'

export interface TestClassProps {
  name: string
  value: number
}

class TestClass extends ValueObject<TestClassProps> {
  get name(): string {
    return this.props.name
  }

  get value(): number {
    return this.props.value
  }

  private constructor(props: TestClassProps) {
    super(props)
  }

  public static create(name: string, value: number): TestClass {
    return new TestClass({ name, value })
  }
}

describe('ValueObject - Tests', () => {
  describe('constructor - Tests', () => {
    it('constructor - successfully case', () => {
      // Arrange
      const name = 'my name'
      const value = 10
      // Act
      const myTestClass = TestClass.create(name, value)
      // Assert
      expect(myTestClass.name).toBe(name)
      expect(myTestClass.value).toBe(value)
    })
  })

  describe('equals - Tests', () => {
    it('equals - case when the two objects are informed and are equals', () => {
      // Arrange
      const name = 'my name'
      const value = 10
      const obj1 = TestClass.create(name, value)
      const obj2 = TestClass.create(name, value)
      // Act
      const result = obj1.equals(obj2)
      // Assert
      expect(result).toBe(true)
    })
    it('equals - case when the two objects are informed and are equals', () => {
      // Arrange
      const name = 'my name'
      const value = 10
      const name2 = 'mu other name'
      const obj1 = TestClass.create(name, value)
      const obj2 = TestClass.create(name2, value)
      // Act
      const result = obj1.equals(obj2)
      // Assert
      expect(result).toBe(false)
    })
    it('equals - case when the second object is null, the objects are not equals', () => {
      // Arrange
      const name = 'my name'
      const value = 10
      const obj1 = TestClass.create(name, value)
      const obj2 = undefined
      // Act
      const result = obj1.equals(obj2)
      // Assert
      expect(result).toBe(false)
    })
    it('equals - case when the second object has no props, the objects are not equals', () => {
      // Arrange
      const name = 'my name'
      const value = 10
      const obj1 = TestClass.create(name, value)
      const obj2 = (<unknown>{ a: 1 }) as TestClass // Forcing the creation of the object of TestClass with undefined props
      // Act
      const result = obj1.equals(obj2)
      // Assert
      expect(result).toBe(false)
    })
  })
})
