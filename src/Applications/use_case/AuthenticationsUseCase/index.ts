import {
  AuthenticationsUseCaseType,
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  RefreshAuthPayload,
} from './types'
import UserLogin from 'Domains/users/entities/UserLogin'
import UserRepository from 'Domains/users/UserRepository'
import EncryptionHelper from 'Applications/security/EncryptionHelper'
import AuthenticationTokenManager from 'Applications/security/AuthenticationTokenManager'
import NewAuthentication from 'Domains/authentication/entities/NewAuthentication'
import AuthRepository from 'Domains/authentication/AuthRepository'
import IdGenerator from 'Applications/common/IdGenerator'

class AuthenticationsUseCase {
  _encryptionHelper: EncryptionHelper
  _userRepository: UserRepository
  _authRepository: AuthRepository
  _tokenManager: AuthenticationTokenManager
  _idGenerator: IdGenerator

  constructor({
    userRepository,
    encryptionHelper,
    authRepository,
    tokenManager,
    idGenerator,
  }: AuthenticationsUseCaseType) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._encryptionHelper = encryptionHelper
    this._tokenManager = tokenManager
    this._idGenerator = idGenerator
  }

  async login({
    username: _username,
    password: _password,
  }: LoginPayload): Promise<LoginResponse> {
    const { values } = new UserLogin({
      username: _username,
      password: _password,
    })
    const { username, password } = values

    const { password: encryptedPassword } =
      await this._userRepository.getPasswordByUsername(username)
    await this._encryptionHelper.comparePassword(password, encryptedPassword)

    const { id } = await this._userRepository.getIdByUsername(username)
    const accessToken = await this._tokenManager.createAccessToken({
      id,
      username,
    })
    const refreshToken = await this._tokenManager.createRefreshToken({
      id,
      username,
    })

    const auth = new NewAuthentication({
      accessToken,
      refreshToken,
    })
    await this._authRepository.addToken(auth.values.refreshToken)

    return {
      refreshToken: auth.values.refreshToken,
    }
  }

  async logout({ refreshToken }: LogoutPayload): Promise<void> {
    await this._authRepository.checkAvailabilityToken(refreshToken)
    await this._authRepository.deleteToken(refreshToken)
  }

  async refreshAuth({
    refreshToken,
  }: RefreshAuthPayload): Promise<{ accessToken: string }> {
    await this._tokenManager.verifyRefreshToken(refreshToken)
    await this._authRepository.checkAvailabilityToken(refreshToken)

    const { id, username } = await this._tokenManager.decodePayload(
      refreshToken,
    )
    const accessToken = await this._tokenManager.createAccessToken({
      id,
      username,
    })
    return { accessToken }
  }
}

export default AuthenticationsUseCase
