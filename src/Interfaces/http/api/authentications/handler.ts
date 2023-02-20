import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import AuthenticationsUseCase from '../../../../Applications/use_case/AuthenticationsUseCase'

class AuthHandler {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async postAuthenticationHandler(request: Request, h: any) {
    const authUseCase: AuthenticationsUseCase = this._container.getInstance(
      AuthenticationsUseCase.name,
    )
    const { username, password } = request.payload as any

    const { refreshToken, accessToken } = await authUseCase.login({
      username,
      password,
    })

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    })
    response.code(201)
    return response
  }

  async putAuthenticationHandler(request: Request, h: any) {
    const authUseCase: AuthenticationsUseCase = this._container.getInstance(
      AuthenticationsUseCase.name,
    )
    const { refreshToken } = request.payload as any

    const res = await authUseCase.refreshAuth({
      refreshToken,
    })

    const response = h.response({
      status: 'success',
      data: res,
    })
    response.code(200)
    return response
  }

  async deleteAuthenticationHandler(request: Request, h: any) {
    const authUseCase: AuthenticationsUseCase = this._container.getInstance(
      AuthenticationsUseCase.name,
    )
    const { refreshToken } = request.payload as any

    await authUseCase.logout({
      refreshToken,
    })

    return {
      status: 'success',
    }
  }
}

export default AuthHandler
