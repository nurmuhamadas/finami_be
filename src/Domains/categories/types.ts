import { CategoryDataType } from './entities/types'

export type GetCategoryResult = CategoryDataType & {
  user_name: string
}

export type GetCategoriesResult = GetCategoryResult[]
