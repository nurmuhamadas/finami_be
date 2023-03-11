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
import { CategoryDataRespType } from '../../../Domains/categories/entities/types'
import CategoriesData from '../../../Domains/categories/entities/CategoriesData'
import UserRepository from '../../../Domains/users/UserRepository'

class CategoriesUseCase {
  _categoryRepository: CategoryRepository
  _userRepository: UserRepository
  _idGenerator: IdGenerator

  constructor({
    categoryRepository,
    userRepository,
    idGenerator,
  }: CategoriesUseCaseType) {
    this._categoryRepository = categoryRepository
    this._userRepository = userRepository
    this._idGenerator = idGenerator
  }

  async getCategories({
    user_id,
    include_child,
    transaction_type,
  }: GetCategoriesPayload): Promise<CategoryDataRespType[]> {
    const filter = new FilterCategory({
      transaction_type,
      include_child,
    })

    const result = await this._categoryRepository.getCategoriesByUserId(
      user_id,
      filter,
    )
    const _default = await this._categoryRepository.getCategoriesDefault()

    const data = new CategoriesData([..._default, ...result], user_id)
    return data.values
  }

  async getCategoryById({
    id,
    user_id,
  }: GetCategoryByIdPayload): Promise<CategoryDataRespType> {
    //  verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.getCategoryById(id)

    const data = new CategoriesData([result], user_id)
    return data.values?.[0]
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

    // verify category not used by other as reference
    await this._categoryRepository.verifyCategoryReference(id)

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
