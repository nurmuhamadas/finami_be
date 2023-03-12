import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import CategoriesUseCase from '../../../../Applications/use_case/CategoriesUseCase'

class CategoriesHandlers {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async getCategoriesHandler(request: Request, h: any) {
    const categoryUseCase: CategoriesUseCase = this._container.getInstance(
      CategoriesUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { transaction_type, user_id } = request.query
    const data = await categoryUseCase.getCategories({
      user_id: userId as string,
      transaction_type,
      user_query_id: user_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async getCategoryByIdHandler(request: Request, h: any) {
    const categoryUseCase: CategoriesUseCase = this._container.getInstance(
      CategoriesUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params as any

    const data = await categoryUseCase.getCategoryById({
      id,
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async postCategoryHandler(request: Request, h: any) {
    const categoryUseCase: CategoriesUseCase = this._container.getInstance(
      CategoriesUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { name, group, transaction_type, icon_url } = request.payload as any

    const data = await categoryUseCase.addCategory({
      user_id: userId as string,
      name,
      group,
      transaction_type,
      icon_url,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(201)
    return response
  }

  async putCategoryHandler(request: Request, h: any) {
    const categoryUseCase: CategoriesUseCase = this._container.getInstance(
      CategoriesUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params
    const { name, group, transaction_type, icon_url } = request.payload as any

    const data = await categoryUseCase.updateCategory({
      id,
      user_id: userId as string,
      name,
      group,
      transaction_type,
      icon_url,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async deleteCategoryHandler(request: Request, h: any) {
    const categoryUseCase: CategoriesUseCase = this._container.getInstance(
      CategoriesUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params

    const data = await categoryUseCase.deleteCategory({
      id,
      user_id: userId as string,
    })

    return {
      status: 'success',
      data,
    }
  }
}

export default CategoriesHandlers
