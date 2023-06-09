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
import StorageServices from '../../../Applications/storage/StorageManager'
import ImageProcessor from '../../../Applications/storage/ImageProcessor'

class CategoriesUseCase {
  private _categoryRepository: CategoryRepository
  private _userRepository: UserRepository
  private _idGenerator: IdGenerator
  private _storageServices: StorageServices
  private _imageProcessor: ImageProcessor
  private _iconSize: number = 100

  constructor({
    categoryRepository,
    userRepository,
    idGenerator,
    storageServices,
    imageProcessor,
  }: CategoriesUseCaseType) {
    this._categoryRepository = categoryRepository
    this._userRepository = userRepository
    this._idGenerator = idGenerator
    this._storageServices = storageServices
    this._imageProcessor = imageProcessor
  }

  async getCategories({
    user_id,
    user_query_id,
    transaction_type,
  }: GetCategoriesPayload): Promise<CategoryDataRespType[]> {
    const filter = new FilterCategory({
      transaction_type,
    })
    let result

    if (user_query_id) {
      result = await this._categoryRepository.getCategoriesByUserId(
        user_query_id,
        filter,
      )
    } else {
      result = await this._categoryRepository.getAllCategories(user_id, filter)
    }

    const _default = await this._categoryRepository.getCategoriesDefault(filter)

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
    icon,
    group,
  }: AddCategoryPayload): Promise<{ id: string }> {
    const { fileName, path } = await this._storageServices.imagePathGenerator(
      icon.hapi.filename,
    )

    const resizedImage = await this._imageProcessor.resizeImage({
      image: icon._data,
      height: this._iconSize,
      width: this._iconSize,
    })

    await this._storageServices.uploadImage(resizedImage, fileName)

    const registerCategory = new RegisterCategory({
      id: this._idGenerator.generate('category'),
      name,
      transaction_type,
      user_id,
      icon_url: path,
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
    icon,
    group,
  }: UpdateCategoryPayload): Promise<{ id: string }> {
    let iconUrl
    if (icon) {
      const { fileName, path } = await this._storageServices.imagePathGenerator(
        icon?.hapi.filename,
      )

      iconUrl = path
      const resizedImage = await this._imageProcessor.resizeImage({
        image: icon._data,
        height: this._iconSize,
        width: this._iconSize,
      })

      await this._storageServices.uploadImage(resizedImage, fileName)
    }

    const currentCategory = await this._categoryRepository.getCategoryById(id)
    const updateDataCategory = new UpdateDataCategory({
      name,
      transaction_type,
      user_id,
      icon_url: icon ? iconUrl : currentCategory.icon_url,
      group,
    })

    //  verify access
    await this._categoryRepository.verifyCategoryOwner(id, user_id)

    const result = await this._categoryRepository.updateCategory(
      id,
      updateDataCategory,
    )

    // Delete icon from storage
    try {
      await this._storageServices.deleteImage(currentCategory?.icon_url)
    } catch (err) {
      console.error((err as Error).message)
    }

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

    const currentCategory = await this._categoryRepository.getCategoryById(id)
    const result = await this._categoryRepository.softDeleteCategoryById(id)

    // Delete icon from storage
    try {
      await this._storageServices.deleteImage(currentCategory?.icon_url)
    } catch (err) {
      console.error((err as Error).message)
    }

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
