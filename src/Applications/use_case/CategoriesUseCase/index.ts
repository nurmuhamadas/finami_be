import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  AddCategoryPayload,
  DeleteCategoryPayload,
  GetCategoryByIdPayload,
  GetCategoriesPayload,
  CategoriesUseCaseType,
  UpdateCategoryPayload,
} from './types'
import CategoryRepository from '../../../Domains/categories/CategoryRepository'
import FilterCategory from '../../../Domains/categories/entities/FilterCategory'
import RegisterCategory from '../../../Domains/categories/entities/RegisterCategory'
import UpdateDataCategory from '../../../Domains/categories/entities/UpdateDataCategory'
import {
  GetCategoriesResult,
  GetCategoryResult,
} from '../../../Domains/categories/types'

class CategoriesUseCase {
  _categoryRepository: CategoryRepository
  _idGenerator: IdGenerator

  constructor({ categoryRepository, idGenerator }: CategoriesUseCaseType) {
    this._categoryRepository = categoryRepository
    this._idGenerator = idGenerator
  }

  async getCategories({
    user_id,
    transaction_type,
  }: GetCategoriesPayload): Promise<GetCategoriesResult> {
    const filter = new FilterCategory({
      transaction_type,
    })

    const result = await this._categoryRepository.getCategoriesByUserId(
      user_id,
      filter,
    )

    return result
  }

  async getCategoryById({
    id,
    user_id,
  }: GetCategoryByIdPayload): Promise<GetCategoryResult> {
    //  verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.getCategoryById(id)
    return result
  }

  async addCategory({
    name,
    transaction_type,
    user_id,
    icon_url,
    group,
  }: AddCategoryPayload): Promise<{ id: string }> {
    const registerCategory = new RegisterCategory({
      id: this._idGenerator.generate('category'),
      name,
      transaction_type,
      user_id,
      icon_url,
      group,
    })

    const result = await this._categoryRepository.addCategory(registerCategory)
    return result
  }

  async updateCategory({
    id,
    name,
    transaction_type,
    user_id,
    icon_url,
    group,
  }: UpdateCategoryPayload): Promise<{ id: string }> {
    const updateDataCategory = new UpdateDataCategory({
      name,
      transaction_type,
      user_id,
      icon_url,
      group,
    })

    //  verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.updateCategory(
      id,
      updateDataCategory,
    )
    return result
  }

  async deleteCategory({
    id,
    user_id,
  }: DeleteCategoryPayload): Promise<{ id: string }> {
    // verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.softDeleteCategoryById(id)
    return result
  }

  async restoreCategory({
    id,
    user_id,
  }: DeleteCategoryPayload): Promise<{ id: string }> {
    // verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.restoreCategoryById(id)
    return result
  }
}

export default CategoriesUseCase
