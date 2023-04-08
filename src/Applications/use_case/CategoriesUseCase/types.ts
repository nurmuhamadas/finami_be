import UserRepository from '../../../Domains/users/UserRepository'
import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  CategoryGroupsType,
  TransactionTypesType,
} from '../../../Commons/types'
import CategoryRepository from '../../../Domains/categories/CategoryRepository'
import StorageServices from '../../../Applications/storage/StorageManager'
import ImageProcessor from '../../../Applications/storage/ImageProcessor'

export type CategoriesUseCaseType = {
  idGenerator: IdGenerator
  categoryRepository: CategoryRepository
  userRepository: UserRepository
  storageServices: StorageServices
  imageProcessor: ImageProcessor
}

export type GetCategoriesPayload = {
  user_id: string
  transaction_type: TransactionTypesType
  user_query_id: string
}

export type GetCategoryByIdPayload = {
  id: string
  user_id: string
}

type IconType = {
  _data: Buffer
  hapi: {
    filename: string
    headers: {
      'content-disposition': string
      'content-type': string
    }
  }
}

export type AddCategoryPayload = {
  name: string
  transaction_type: TransactionTypesType
  icon: IconType
  user_id: string
  group: CategoryGroupsType
}

export type UpdateCategoryPayload = {
  id: string
  name: string
  transaction_type: TransactionTypesType
  icon: IconType
  user_id: string
  group: CategoryGroupsType
}

export type DeleteCategoryPayload = {
  id: string
  user_id: string
}
