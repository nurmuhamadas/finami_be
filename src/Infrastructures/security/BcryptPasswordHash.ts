import EncryptionHelper from '../../Applications/security/EncryptionHelper'

class BcryptPasswordHash extends EncryptionHelper {
  _bcrypt: any
  _saltRound: number

  constructor(bcrypt: any, saltRound: number = 10) {
    super()
    this._bcrypt = bcrypt
    this._saltRound = saltRound
  }

  async hash(password: string): Promise<string> {
    return this._bcrypt.hash(password, this._saltRound)
  }

  async comparePassword(password: string, hashedPassword: string) {
    const result = await this._bcrypt.compare(password, hashedPassword)

    if (!result) {
      // throw new AuthenticationError('kredensial yang Anda masukkan salah')
    }
  }
}

export default BcryptPasswordHash
