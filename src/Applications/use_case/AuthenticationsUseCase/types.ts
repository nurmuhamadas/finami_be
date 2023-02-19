import IdGenerator from 'Applications/common/IdGenerator'
import AuthenticationTokenManager from 'Applications/security/AuthenticationTokenManager'
import EncryptionHelper from 'Applications/security/EncryptionHelper'
import AuthRepository from 'Domains/authentication/AuthRepository'
import UserRepository from 'Domains/users/UserRepository'

export type AuthenticationsUseCaseType = {
  idGenerator: IdGenerator
  encryptionHelper: EncryptionHelper
  userRepository: UserRepository
  authRepository: AuthRepository
  tokenManager: AuthenticationTokenManager
}

export type LoginPayload = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LogoutPayload = {
  refreshToken: string
}

export type RefreshAuthPayload = {
  refreshToken: string
}
