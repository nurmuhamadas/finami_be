import { AccessTokenPayloadType, RefreshTokenPayloadType } from './types'

class AuthenticationTokenManager {
  async createRefreshToken(payload: RefreshTokenPayloadType): Promise<string> {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async createAccessToken(payload: AccessTokenPayloadType): Promise<string> {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async verifyRefreshToken(token: string): Promise<void> {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async decodePayload(token: string): Promise<any> {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }
}

export default AuthenticationTokenManager
