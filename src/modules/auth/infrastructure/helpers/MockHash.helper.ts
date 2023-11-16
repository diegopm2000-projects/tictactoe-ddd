import { IHashHelper } from '../../application/ports/output/IHash.helper'

export class HashHelper implements IHashHelper {
  toHash(text: string): string {
    return text
  }

  compare(secret: string, hashedSecret: string): boolean {
    return secret == hashedSecret
  }
}
