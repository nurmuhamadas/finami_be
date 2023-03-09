import {
  AuthenticationsUseCaseType,
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  RefreshAuthPayload,
} from './types'
import UserLogin from '../../../Domains/users/entities/UserLogin'
import UserRepository from '../../../Domains/users/UserRepository'
import EncryptionHelper from '../../../Applications/security/EncryptionHelper'
import AuthenticationTokenManager from '../../../Applications/security/AuthenticationTokenManager'
import NewAuthentication from '../../../Domains/authentication/entities/NewAuthentication'
import AuthRepository from '../../../Domains/authentication/AuthRepository'

class AuthenticationsUseCase {
  _encryptionHelper: EncryptionHelper
  _userRepository: UserRepository
  _authRepository: AuthRepository
  _tokenManager: AuthenticationTokenManager

  constructor({
    userRepository,
    encryptionHelper,
    authRepository,
    tokenManager,
  }: AuthenticationsUseCaseType) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._encryptionHelper = encryptionHelper
    this._tokenManager = tokenManager
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
    const user = await this._userRepository.getUserById(id)
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
      user,
    })
    await this._authRepository.addToken(auth.values.refreshToken)

    return {
      refreshToken: auth.values.refreshToken,
      accessToken: auth.values.accessToken,
      user: auth.values.user,
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
