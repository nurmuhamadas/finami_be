import {
  CategoryDataType,
  CategoryFilter,
  RegisterCategoryType,
  UpdateDataCategoryType,
} from './entities/types'

class CategoryRepository {
  async addCategory(
    registerCategory: RegisterCategoryType,
  ): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateCategory(
    id: string,
    updateDataCategory: UpdateDataCategoryType,
  ): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteCategoryById(id: string): Promise<{ id: string }> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getCategoriesByUserId(
    userId: string,
    filter?: CategoryFilter,
  ): Promise<CategoryDataType[]> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getCategoryById(id: string): Promise<CategoryDataType> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default CategoryRepository
