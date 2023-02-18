import AuthenticationTokenManager from 'Applications/security/AuthenticationTokenManager'
import EncryptionHelper from 'Applications/security/EncryptionHelper'
import { IdGeneratorType } from 'Commons/types'
import AuthRepository from 'Domains/authentication/AuthRepository'
import UserRepository from 'Domains/users/UserRepository'

export type AuthenticationsUseCaseType = {
  idGenerator: IdGeneratorType
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
  refreshToken: string
}

export type LogoutPayload = {
  refreshToken: string
}

export type RefreshAuthPayload = {
  refreshToken: string
}
