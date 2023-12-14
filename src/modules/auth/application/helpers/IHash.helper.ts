export interface IHashHelper {
  toHash(text: string): string
  compare(secret: string, hashedSecret: string): boolean
}
