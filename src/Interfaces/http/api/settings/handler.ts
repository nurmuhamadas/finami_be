import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import WalletsUseCase from '../../../../Applications/use_case/WalletsUseCase'
import SettingsUseCase from '../../../../Applications/use_case/SettingsUseCase'

class SettingsHandlers {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async getSettingByUserIdHandler(request: Request, h: any) {
    const settingsUseCase: SettingsUseCase = this._container.getInstance(
      SettingsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const data = await settingsUseCase.getSettingByUserId({
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async getSettingByIdHandler(request: Request, h: any) {
    const settingsUseCase: SettingsUseCase = this._container.getInstance(
      SettingsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params as any
    const data = await settingsUseCase.getSettingById({
      id,
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async putSettingHandler(request: Request, h: any) {
    const settingsUseCase: SettingsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params
    const { currency_id, date_format } = request.payload as any

    const data = await settingsUseCase.updateSetting({
      id,
      user_id: userId as string,
      currency_id,
      date_format,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async deleteSettingHandler(request: Request, h: any) {
    const settingsUseCase: SettingsUseCase = this._container.getInstance(
      WalletsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params

    const data = await settingsUseCase.deleteSetting({
      id,
      parent_id: userId as string,
    })

    return {
      status: 'success',
      data,
    }
  }
}

export default SettingsHandlers
