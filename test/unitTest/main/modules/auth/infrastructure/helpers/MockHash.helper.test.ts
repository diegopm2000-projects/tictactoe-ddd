import 'reflect-metadata'

import { DEFAULT_HASHED_SECRET } from '../../../../../expectations/expectations'

// SUT
import { HashHelper } from '../../../../../../../src/modules/auth/infrastructure/helpers/MockHash.helper'

describe('MockHashHelper - Tests', () => {
  it('toHash - default successfully case', () => {
    // Arrange
    const secret = 'mySecret'
    // Act
    const result = HashHelper.getInstance().toHash(secret)
    // Assert
    expect(result).toBe(DEFAULT_HASHED_SECRET)
  })
  it('toHash - default successfully case', () => {
    // Arrange
    const secret = 'mySecret'
    // Act
    const result = HashHelper.getInstance().compare(secret, DEFAULT_HASHED_SECRET)
    // Assert
    expect(result).toBe(true)
  })
})
