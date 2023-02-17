import FilterCategory from './entities/FilterCategory'
import RegisterCategory from './entities/RegisterCategory'
import UpdateDataCategory from './entities/UpdateDataCategory'
import { CategoryDataType } from './entities/types'
import { GetCategoriesResult, GetCategoryResult } from './types'

class CategoryRepository {
  async addCategory(
    registerCategory: RegisterCategory,
  ): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateCategory(
    id: string,
    updateDataCategory: UpdateDataCategory,
  ): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteCategoryById(id: string): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreCategoryById(id: string): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getCategoriesByUserId(
    userId: string,
    filter?: FilterCategory,
  ): Promise<GetCategoriesResult> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getCategoryById(id: string): Promise<GetCategoryResult> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default CategoryRepository
