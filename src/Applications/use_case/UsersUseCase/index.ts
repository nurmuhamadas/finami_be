import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  AddUserPayload,
  DeleteUserPayload,
  GetUsersByIdPayload,
  UsersUseCaseType,
  UpdateUserPayload,
} from './types'
import SettingRepository from '../../../Domains/settings/SettingRepository'
import RegisterSetting from '../../../Domains/settings/entities/RegisterSetting'
import UserRepository from '../../../Domains/users/UserRepository'
import RegisterUser from '../../../Domains/users/entities/RegisterUser'
import UpdateDataUser from '../../../Domains/users/entities/UpdateDataUser'
import { GetUsersResult } from '../../../Domains/users/types'
import EncryptionHelper from 'Applications/security/EncryptionHelper'

class UsersUseCase {
  _settingRepository: SettingRepository
  _userRepository: UserRepository
  _idGenerator: IdGenerator
  _encryptionHelper: EncryptionHelper

  constructor({
    settingRepository,
    userRepository,
    encryptionHelper,
    idGenerator,
  }: UsersUseCaseType) {
    this._settingRepository = settingRepository
    this._userRepository = userRepository
    this._idGenerator = idGenerator
    this._encryptionHelper = encryptionHelper
  }

  async getUsersById({
    user_id,
  }: GetUsersByIdPayload): Promise<GetUsersResult> {
    const result = await this._userRepository.getUserById(user_id)
    const child = await this._userRepository.getChildByParentId(user_id)
    return [result, ...child]
  }

  async addUser({
    username,
    email,
    password,
    fullname,
    parent_id,
    image_url,
  }: AddUserPayload): Promise<{ id: string }> {
    const registerUser = new RegisterUser({
      id: this._idGenerator.generate('user'),
      username,
      email,
      password,
      fullname,
      parent_id,
      image_url,
    })

    // Verify parent_id
    if (parent_id) {
      await this._userRepository.verifyAvailableParent(parent_id)
    }

    const hashedPassword = await this._encryptionHelper.hash(password)
    registerUser.values.password = hashedPassword

    const result = await this._userRepository.addUser(registerUser)

    // Add setting
    const registerSetting = new RegisterSetting({
      id: this._idGenerator.generate('setting'),
      date_format: 'dd-mm-yyyy',
      currency_id: 'currency-1',
      user_id: result.id,
    })
    await this._settingRepository.addSetting(registerSetting)

    return result
  }

  async updateUser({
    id,
    username,
    email,
    password,
    fullname,
    image_url,
    user_id,
  }: UpdateUserPayload): Promise<{ id: string }> {
    const updateDataUser = new UpdateDataUser({
      username,
      email,
      password,
      fullname,
      image_url,
    })

    //  verify access
    await this._userRepository.verifyUserAccess(id, user_id)

    const hashedPassword = await this._encryptionHelper.hash(password)
    updateDataUser.values.password = hashedPassword

    const result = await this._userRepository.updateUser(id, updateDataUser)
    return result
  }

  async deleteUser({
    id,
    parent_id,
  }: DeleteUserPayload): Promise<{ id: string }> {
    // verify access
    await this._userRepository.verifyUserParent(id, parent_id)

    const result = await this._userRepository.softDeleteUserById(id)
    await this._settingRepository.softDeleteSettingByParentId(parent_id)
    return result
  }

  async restoreUser({
    id,
    parent_id,
  }: DeleteUserPayload): Promise<{ id: string }> {
    // verify access
    await this._userRepository.verifyUserParent(id, parent_id)

    const result = await this._userRepository.restoreUserById(id)
    await this._settingRepository.restoreSettingByParentId(parent_id)
    return result
  }
}

export default UsersUseCase
