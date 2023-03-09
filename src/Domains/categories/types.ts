import { CategoryDataType } from './entities/types'

export type GetCategoryResult = CategoryDataType & {
  user_name: string
  is_owner: boolean
}

export type GetCategoriesResult = GetCategoryResult[]
