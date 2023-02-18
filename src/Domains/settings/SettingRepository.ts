import RegisterSetting from './entities/RegisterSetting'
import UpdateDataSetting from './entities/UpdateDataSetting'
import { GetSettingResult } from './types'

class SettingRepository {
  async addSetting(registerSetting: RegisterSetting): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateSetting(
    id: string,
    updateDataSetting: UpdateDataSetting,
  ): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteSettingById(id: string): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreSettingById(id: string): Promise<{ id: string }> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getSettingByUserId(userId: string): Promise<GetSettingResult> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getSettingById(id: string): Promise<GetSettingResult> {
    throw new Error('SETTING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default SettingRepository
