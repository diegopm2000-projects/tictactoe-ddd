/* eslint-disable @typescript-eslint/no-explicit-any */

import { UniqueEntityID } from './uniqueEntityID'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  protected props: T

  get id(): UniqueEntityID {
    return this._id
  }

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : UniqueEntityID.generate()
    this.props = props
  }

  // Entities are compared based on their referential equality.
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this._id.equals(object._id)
  }
}
