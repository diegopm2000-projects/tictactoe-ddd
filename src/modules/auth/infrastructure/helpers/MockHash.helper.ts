import { injectable } from 'inversify'

import { IHashHelper } from '../../application/ports/output/IHash.helper'

export const MOCK_HASHED_SECRET = 'myhashedsecret'

@injectable()
export class HashHelper implements IHashHelper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toHash(secret: string): string {
    return MOCK_HASHED_SECRET
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compare(secret: string, hashedSecret: string): boolean {
    return true
  }

  public static getInstance() {
    return new HashHelper()
  }
}
