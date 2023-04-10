import EncryptionHelper from '../../../Applications/security/EncryptionHelper'
import IdGenerator from '../../../Applications/common/IdGenerator'
import SettingRepository from '../../../Domains/settings/SettingRepository'
import UserRepository from '../../../Domains/users/UserRepository'
import ImageProcessor from '../../../Applications/storage/ImageProcessor'
import StorageServices from '../../../Applications/storage/StorageManager'

export type UsersUseCaseType = {
  idGenerator: IdGenerator
  userRepository: UserRepository
  settingRepository: SettingRepository
  encryptionHelper: EncryptionHelper
  storageServices: StorageServices
  imageProcessor: ImageProcessor
}

export type GetUsersByUserIdPayload = {
  user_id: string
  member_only?: boolean
}

export type GetUserByIdPayload = {
  id: string
  user_id: string
}

export type AddUserPayload = {
  username: string
  email: string
  password: string
  fullname: string
  image_url: string
}

type ImageType = {
  _data: Buffer
  hapi: {
    filename: string
    headers: {
      'content-disposition': string
      'content-type': string
    }
  }
}

export type UpdateUserPayload = {
  id: string
  user_id: string
  username: string
  fullname: string
  image?: ImageType | 'delete'
}

export type DeleteUserPayload = {
  id: string
  parent_id: string
}

export type AddUserMemberPayload = {
  username: string
  email: string
  password: string
  fullname: string
  image_url: string
  parent_id: string
}

export type UpdateUserMemberPayload = {
  id: string
  user_id: string
  username: string
  fullname: string
  image_url?: string
  parent_id: string
}
