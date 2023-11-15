import { UniqueEntityID } from '../../../../src/shared/domain/uniqueEntityID'
import { ALT_UUID_STR, DEFAULT_UUID_STR } from '../../expectations/expectations'

// SUT
import { Entity } from '../../../../src/shared/domain/entity'

type EntityTestClassProps = {
  name: string
  surname: string
  email: string
}

class EntityTestClass extends Entity<EntityTestClassProps> {
  get name(): string {
    return this.props.name
  }

  get surname(): string {
    return this.props.surname
  }

  get email(): string {
    return this.props.email
  }

  private constructor(props: EntityTestClassProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: EntityTestClassProps, id?: UniqueEntityID): EntityTestClass {
    return new EntityTestClass(props, id)
  }
}

const DEFAULT_PROPS = {
  name: 'name',
  surname: 'surname',
  email: 'user@mail.com',
}
const ALT_PROPS = {
  name: 'name2',
  surname: 'surname2',
  email: 'user2@mail.com',
}

const DEFAULT_UNIQUE_ENTITY_ID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value
const ALT_UNIQUE_ENTITY_ID = <UniqueEntityID>UniqueEntityID.create(ALT_UUID_STR).value

describe('Entity - Tests', () => {
  describe('Entity - Tests', () => {
    describe('constructor - Tests', () => {
      it('constructor - case when uuid was passed as parameter', () => {
        // Arrange
        const props = DEFAULT_PROPS
        // Act
        const myEntity = EntityTestClass.create(props, DEFAULT_UNIQUE_ENTITY_ID)
        // Assert
        expect(myEntity.name).toBe(props.name)
        expect(myEntity.surname).toBe(props.surname)
        expect(myEntity.email).toBe(props.email)
      })
      it('constructor - case when uuid was NOT passed as parameter', () => {
        // Arrange
        const props = {
          name: 'name',
          surname: 'surname',
          email: 'user@mail.com',
        }
        // Act
        const myEntity = EntityTestClass.create(props)
        // Assert
        expect(myEntity.name).toBe(props.name)
        expect(myEntity.surname).toBe(props.surname)
        expect(myEntity.email).toBe(props.email)
      })
    })
    describe('equals - Tests', () => {
      it('equals - case when the two objects are entities, same props and are equals', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(true)
      })
      it('equals - case when the two objects are entities, different props and are equals', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = EntityTestClass.create(ALT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(true)
      })
      it('equals - case when the two objects are entities, same props but are NOT equals', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = EntityTestClass.create(DEFAULT_PROPS, ALT_UNIQUE_ENTITY_ID)
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(false)
      })
      it('equals - case when the second object is undefined', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = undefined
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(false)
      })
      it('equals - case when the first object and the second object has the same reference, then the objects are equals', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = myEntity
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(true)
      })
      it('equals - case when the second object is not an entity, the objects are NOT equals', () => {
        // Assert
        const myEntity = EntityTestClass.create(DEFAULT_PROPS, DEFAULT_UNIQUE_ENTITY_ID)
        const myEntity2 = (<unknown>{ a: 1 }) as EntityTestClass
        // Act
        const result = myEntity.equals(myEntity2)
        // Assert
        expect(result).toBe(false)
      })
    })
  })
})
