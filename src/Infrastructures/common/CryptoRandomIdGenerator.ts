import IdGenerator from '../../Applications/common/IdGenerator'
import cryptoRandomString from 'crypto-random-string'

class CryptoRandomIdGenerator extends IdGenerator {
  _crypto: typeof cryptoRandomString

  constructor({ crypto }: { crypto: typeof cryptoRandomString }) {
    super()
    this._crypto = crypto
  }

  generate(prefix: string, length = 20): string {
    const _length = length - prefix.length - 1
    const _random = cryptoRandomString({
      length: _length,
      type: 'alphanumeric',
    })

    return `${prefix}-${_random}`
  }
}

export default CryptoRandomIdGenerator
