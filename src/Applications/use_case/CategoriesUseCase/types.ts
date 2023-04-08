import UserRepository from '../../../Domains/users/UserRepository'
import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  CategoryGroupsType,
  TransactionTypesType,
} from '../../../Commons/types'
import CategoryRepository from '../../../Domains/categories/CategoryRepository'
import StorageServices from '../../../Applications/storage/StorageManager'

export type CategoriesUseCaseType = {
  idGenerator: IdGenerator
  categoryRepository: CategoryRepository
  userRepository: UserRepository
  storageServices: StorageServices
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

export type AddCategoryPayload = {
  name: string
  transaction_type: TransactionTypesType
  icon: {
    _data: Buffer
    hapi: {
      filename: string
      headers: {
        'content-disposition': 'form-data; name="icon"; filename="flower.jpg"'
        'content-type': 'image/jpeg'
      }
    }
  }
  user_id: string
  group: CategoryGroupsType
}

export type UpdateCategoryPayload = {
  id: string
  name: string
  transaction_type: TransactionTypesType
  icon_url: string
  user_id: string
  group: CategoryGroupsType
}

export type DeleteCategoryPayload = {
  id: string
  user_id: string
}
