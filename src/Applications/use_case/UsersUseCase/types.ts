import { DateFormatType, IdGeneratorType } from 'Commons/types'
import SettingRepository from 'Domains/settings/SettingRepository'
import UserRepository from 'Domains/users/UserRepository'

export type UsersUseCaseType = {
  idGenerator: IdGeneratorType
  userRepository: UserRepository
  settingRepository: SettingRepository
}

export type GetUsersByIdPayload = {
  user_id: string
}

export type AddUserPayload = {
  username: string
  email: string
  password: string
  fullname: string
  parent_id: string
  image_url: string
}

export type UpdateUserPayload = {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  image_url: string
  user_id: string
}

export type DeleteUserPayload = {
  id: string
  parent_id: string
}
