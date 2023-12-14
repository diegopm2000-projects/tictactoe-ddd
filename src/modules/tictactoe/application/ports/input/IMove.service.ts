import { UserCredential } from '../../../../auth/domain/userCredential'
import { UniqueEntityID } from '../../../../shared/domain/core/uniqueEntityID'

export interface IMoveRequest {
  userCredential: UserCredential
  idGame: UniqueEntityID
  row: number
  col: number
}
