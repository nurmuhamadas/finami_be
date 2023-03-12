import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import WalletsUseCase from '../../../../Applications/use_case/WalletsUseCase'

class WalletsHandler {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async getWAlletsHandler(request: Request, h: any) {
    const walletUseCase: WalletsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const data = await walletUseCase.getWallets({
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async getWAlletByIdHandler(request: Request, h: any) {
    const walletUseCase: WalletsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params as any

    const data = await walletUseCase.getWalletById({
      wallet_id: id,
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async postWalletHandler(request: Request, h: any) {
    const walletUseCase: WalletsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { name, balance } = request.payload as any

    const data = await walletUseCase.addWallet({
      name,
      balance,
      userId: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(201)
    return response
  }

  async putWalletHandler(request: Request, h: any) {
    const walletUseCase: WalletsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params
    const { name, balance } = request.payload as any

    const data = await walletUseCase.updateWallet({
      name,
      balance,
      userId: userId as string,
      walletId: id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async deleteWalletHandler(request: Request, h: any) {
    const walletUseCase: WalletsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params

    const data = await walletUseCase.deleteWallet({
      userId: userId as string,
      walletId: id,
    })

    return {
      status: 'success',
      data,
    }
  }
}

export default WalletsHandler
