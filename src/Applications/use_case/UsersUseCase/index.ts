import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  AddUserPayload,
  DeleteUserPayload,
  UsersUseCaseType,
  UpdateUserPayload,
  GetUserByIdPayload,
  GetUsersByUserIdPayload,
  AddUserMemberPayload,
  UpdateUserMemberPayload,
} from './types'
import SettingRepository from '../../../Domains/settings/SettingRepository'
import RegisterSetting from '../../../Domains/settings/entities/RegisterSetting'
import UserRepository from '../../../Domains/users/UserRepository'
import RegisterUser from '../../../Domains/users/entities/RegisterUser'
import UpdateDataUser from '../../../Domains/users/entities/UpdateDataUser'
import EncryptionHelper from '../../../Applications/security/EncryptionHelper'
import { UserDataRespType } from '../../../Domains/users/entities/types'
import ImageProcessor from '../../../Applications/storage/ImageProcessor'
import StorageServices from '../../../Applications/storage/StorageManager'

class UsersUseCase {
  private _settingRepository: SettingRepository
  private _userRepository: UserRepository
  private _idGenerator: IdGenerator
  private _encryptionHelper: EncryptionHelper
  private _storageServices: StorageServices
  private _imageProcessor: ImageProcessor

  private _imageSize = 300

  constructor({
    settingRepository,
    userRepository,
    encryptionHelper,
    idGenerator,
    imageProcessor,
    storageServices,
  }: UsersUseCaseType) {
    this._settingRepository = settingRepository
    this._userRepository = userRepository
    this._idGenerator = idGenerator
    this._encryptionHelper = encryptionHelper
    this._storageServices = storageServices
    this._imageProcessor = imageProcessor
  }

  private async _fileNameGenerator(_fileName: string) {
    const fileName = `${+new Date()}-${_fileName
      ?.replaceAll(' ', '_')
      ?.toLowerCase()}`
    const imageUrl = `uploads/${fileName}`

    return { fileName, imageUrl }
  }

  async getUsersByUserId({
    user_id,
    member_only,
  }: GetUsersByUserIdPayload): Promise<UserDataRespType[]> {
    const data = []

    if (!member_only) {
      const result = await this._userRepository.getUserById(user_id)
      data.push(result)
    }

    const child = await this._userRepository.getChildByParentId(user_id)
    data.push(...child)

    return data
  }

  async getUserById({
    user_id,
  }: GetUserByIdPayload): Promise<UserDataRespType> {
    const result = await this._userRepository.getUserById(user_id)
    return result
  }

  async addUser({
    username,
    email,
    password,
    fullname,
    image_url,
  }: AddUserPayload): Promise<{ id: string }> {
    const registerUser = new RegisterUser({
      id: this._idGenerator.generate('user'),
      username,
      email,
      password,
      fullname,
      image_url,
    })

    await this._userRepository.verifyAvailableUsername(
      registerUser.values.username,
    )
    await this._userRepository.verifyAvailableEmail(registerUser.values.email)

    const hashedPassword = await this._encryptionHelper.hash(password)
    registerUser.values.password = hashedPassword

    const result = await this._userRepository.addUser(registerUser)

    // Add setting
    const registerSetting = new RegisterSetting({
      id: this._idGenerator.generate('setting'),
      date_format: 'dd-mm-yyyy',
      currency_id: 'currency-00000000001',
      user_id: result.id,
    })
    await this._settingRepository.addSetting(registerSetting)

    return result
  }

  async updateUser({
    id,
    username,
    fullname,
    image,
    user_id,
  }: UpdateUserPayload): Promise<{ id: string }> {
    let _imageUrl
    if (image) {
      const { fileName, imageUrl } = await this._fileNameGenerator(
        image?.hapi.filename || '',
      )
      _imageUrl = imageUrl

      const resizedImage = await this._imageProcessor.resizeImage({
        image: image._data,
        height: this._imageSize,
        width: this._imageSize,
      })

      await this._storageServices.uploadImage(resizedImage, fileName)
    }

    const currentUser = await this._userRepository.getUserById(id)
    const updateDataUser = new UpdateDataUser({
      username,
      fullname,
      image_url: image ? _imageUrl : currentUser?.image_url,
    })

    //  verify access
    await this._userRepository.verifyUserAccess(id, user_id)

    const result = await this._userRepository.updateUser(id, updateDataUser)

    // Delete last photo profile
    if (currentUser?.image_url && image) {
      await this._storageServices.deleteImage(
        currentUser?.image_url?.replace('uploads/', ''),
      )
    }

    return result
  }

  async deleteUser({
    id,
    parent_id,
  }: DeleteUserPayload): Promise<{ id: string }> {
    // verify access
    await this._userRepository.verifyUserParent(id, parent_id)

    const result = await this._userRepository.softDeleteUserById(id)
    await this._settingRepository.softDeleteSettingByParentId(result.id)
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

  async addUserMember({
    username,
    email,
    password,
    fullname,
    image_url,
    parent_id,
  }: AddUserMemberPayload): Promise<{ id: string }> {
    const registerUser = new RegisterUser({
      id: this._idGenerator.generate('user'),
      username,
      email,
      password,
      fullname,
      image_url,
      parent_id,
    })

    await this._userRepository.verifyAvailableUsername(
      registerUser.values.username,
    )
    await this._userRepository.verifyAvailableEmail(registerUser.values.email)

    const hashedPassword = await this._encryptionHelper.hash(password)
    registerUser.values.password = hashedPassword

    const result = await this._userRepository.addUser(registerUser)

    // Add setting
    const registerSetting = new RegisterSetting({
      id: this._idGenerator.generate('setting'),
      date_format: 'dd-mm-yyyy',
      currency_id: 'currency-00000000001',
      user_id: result.id,
    })
    await this._settingRepository.addSetting(registerSetting)

    return result
  }

  async updateUserMember({
    id,
    username,
    fullname,
    image_url,
    user_id,
    parent_id,
  }: UpdateUserMemberPayload): Promise<{ id: string }> {
    const updateDataUser = new UpdateDataUser({
      username,
      fullname,
      image_url,
    })

    //  verify access
    await this._userRepository.verifyUserParent(user_id, parent_id)

    const result = await this._userRepository.updateUser(id, updateDataUser)
    return result
  }
}

export default UsersUseCase
