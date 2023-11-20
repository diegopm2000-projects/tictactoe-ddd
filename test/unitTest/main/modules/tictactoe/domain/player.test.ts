import 'reflect-metadata'

import { UniqueEntityID } from '../../../../../../src/modules/shared/domain/uniqueEntityID'
import { EmailNotValidError } from '../../../../../../src/modules/tictactoe/domain/errors/EmailNotValidError'
import { NickNotValidError } from '../../../../../../src/modules/tictactoe/domain/errors/NickNotValidError'
import { DEFAULT_UUID_STR } from '../../../../expectations/expectations'

// SUT
import { Player } from '../../../../../../src/modules/tictactoe/domain/player'

const DEFAULT_ID: UniqueEntityID = <UniqueEntityID>UniqueEntityID.create(DEFAULT_UUID_STR).value

const DEFAULT_MAIL = 'alias@mail.com'
const DEFAULT_ALIAS = 'alias'

describe('Player - Tests', () => {
  it('create - successfully case passing the id', () => {
    // Arrange
    const email = DEFAULT_MAIL
    const nick = DEFAULT_ALIAS
    // Act
    const result = Player.create({ nick, email }, DEFAULT_ID)
    // Assert
    expect(result.isRight()).toBe(true)
    const myPlayer = <Player>result.value
    expect(myPlayer.email.value).toBe(email)
    expect(myPlayer.nick.value).toBe(nick)
  })
  it('create - successfully case NOT passing the id', () => {
    // Arrange
    const email = DEFAULT_MAIL
    const nick = DEFAULT_ALIAS
    // Act
    const result = Player.create({ nick, email })
    // Assert
    expect(result.isRight()).toBe(true)
    const myPlayer = <Player>result.value
    expect(myPlayer.email.value).toBe(email)
    expect(myPlayer.nick.value).toBe(nick)
  })
  it('create - failed case when value of nick passed as parameter is not valid', () => {
    // Arrange
    const email = DEFAULT_MAIL
    const nick = ''
    // Act
    const result = Player.create({ nick, email }, DEFAULT_ID)
    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NickNotValidError)
  })
  it('create - failed case when value of email passed as parameter is not valid', () => {
    // Arrange
    const email = 'nonsense'
    const nick = DEFAULT_ALIAS
    // Act
    const result = Player.create({ nick, email }, DEFAULT_ID)
    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(EmailNotValidError)
  })
})
