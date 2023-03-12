import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  AddSettingPayload,
  DeleteSettingPayload,
  GetSettingByIdPayload,
  GetSettingByUserIdPayload,
  SettingsUseCaseType,
  UpdateSettingPayload,
} from './types'
import SettingRepository from '../../../Domains/settings/SettingRepository'
import RegisterSetting from '../../../Domains/settings/entities/RegisterSetting'
import UpdateDataSetting from '../../../Domains/settings/entities/UpdateDataSetting'
import { GetSettingResult } from '../../../Domains/settings/types'

class SettingsUseCase {
  _settingRepository: SettingRepository
  _idGenerator: IdGenerator

  constructor({ settingRepository, idGenerator }: SettingsUseCaseType) {
    this._settingRepository = settingRepository
    this._idGenerator = idGenerator
  }

  async getSettingByUserId({
    user_id,
  }: GetSettingByUserIdPayload): Promise<GetSettingResult> {
    const result = await this._settingRepository.getSettingByUserId(user_id)
    return result
  }

  async getSettingById({
    id,
    user_id,
  }: GetSettingByIdPayload): Promise<GetSettingResult> {
    // verify access
    await this._settingRepository.verifySettingWriteAndReadAccess(id, user_id)

    const result = await this._settingRepository.getSettingById(id)
    return result
  }

  async addSetting({
    date_format,
    currency_id,
    user_id,
  }: AddSettingPayload): Promise<{ id: string }> {
    const registerSetting = new RegisterSetting({
      id: this._idGenerator.generate('setting'),
      date_format,
      currency_id,
      user_id,
    })

    const result = await this._settingRepository.addSetting(registerSetting)
    return result
  }

  async updateSetting({
    id,
    currency_id,
    date_format,
    user_id,
  }: UpdateSettingPayload): Promise<{ id: string }> {
    const updateDataSetting = new UpdateDataSetting({
      currency_id,
      date_format,
    })

    //  verify access
    await this._settingRepository.verifySettingWriteAndReadAccess(id, user_id)

    const result = await this._settingRepository.updateSetting(
      id,
      updateDataSetting,
    )
    return result
  }

  async deleteSetting({
    id,
    parent_id,
  }: DeleteSettingPayload): Promise<{ id: string }> {
    // verify access
    await this._settingRepository.verifySettingDeleteAccess(id, parent_id) // ONLY parent can delete setting

    const result = await this._settingRepository.softDeleteSettingById(id)
    return result
  }

  async restoreSetting({
    id,
    parent_id,
  }: DeleteSettingPayload): Promise<{ id: string }> {
    // verify access
    await this._settingRepository.verifySettingDeleteAccess(id, parent_id) // ONLY parent can delete setting

    const result = await this._settingRepository.restoreSettingById(id)
    return result
  }
}

export default SettingsUseCase
