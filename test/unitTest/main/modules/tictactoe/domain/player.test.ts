import 'reflect-metadata'

import { UniqueEntityID } from '../../../../../../src/modules/shared/domain/core/uniqueEntityID'
import { DEFAULT_EMAIL, DEFAULT_NICK, DEFAULT_UUID_STR } from '../../../../expectations/expectations'

// SUT
import { Player } from '../../../../../../src/modules/tictactoe/domain/player'

const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value

describe('Player - Tests', () => {
  it('create - successfully case passing the id', () => {
    // Arrange
    const playerProps = {
      email: DEFAULT_EMAIL,
      nick: DEFAULT_NICK,
    }
    // Act
    const result = Player.create(playerProps, DEFAULT_ID)
    // Assert
    expect(result.email.value).toBe(playerProps.email.value)
    expect(result.nick.value).toBe(playerProps.nick.value)
    expect(result.id.value).toBe(DEFAULT_ID.value)
  })
  it('create - successfully case NOT passing the id', () => {
    // Arrange
    const playerProps = {
      email: DEFAULT_EMAIL,
      nick: DEFAULT_NICK,
    }
    // Act
    const result = Player.create(playerProps)
    // Assert
    expect(result.email.value).toBe(playerProps.email.value)
    expect(result.nick.value).toBe(playerProps.nick.value)
  })
})
