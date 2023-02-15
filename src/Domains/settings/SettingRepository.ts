import {
  RegisterSettingType,
  SettingDataType,
  UpdateDataSettingType,
} from './entities/types'

class SettingRepository {
  async addSetting(
    registerSetting: RegisterSettingType,
  ): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateSetting(
    id: string,
    updateDataSetting: UpdateDataSettingType,
  ): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteSettingById(id: string): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getSettingByUserId(userId: string): Promise<SettingDataType> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getSettingById(id: string): Promise<SettingDataType> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default SettingRepository
