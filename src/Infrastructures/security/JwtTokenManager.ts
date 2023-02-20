import {
  AccessTokenPayloadType,
  RefreshTokenPayloadType,
} from 'Applications/security/types'
import { JwtType } from './types'

import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager'
import InvariantError from '../../Commons/exceptions/InvariantError'

class JwtTokenManager extends AuthenticationTokenManager {
  _jwt: JwtType

  constructor(jwt: JwtType) {
    super()
    this._jwt = jwt
  }

  async createAccessToken(payload: AccessTokenPayloadType) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY as string)
  }

  async createRefreshToken(payload: RefreshTokenPayloadType) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY as string)
  }

  async verifyRefreshToken(token: string) {
    try {
      const artifacts = this._jwt.decode(token)
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY as string)
    } catch (error) {
      throw new InvariantError('refresh token tidak valid')
    }
  }

  async decodePayload(token: string) {
    const artifacts = await this._jwt.decode(token)
    return artifacts.decoded.payload
  }
}

export default JwtTokenManager
