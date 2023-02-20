import { Request } from '@hapi/hapi'
import containerInstance from '../../../../Infrastructures/container'
import UsersUseCase from '../../../../Applications/use_case/UsersUseCase'
import autoBind from 'auto-bind'

class UsersHandler {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async postUserHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { username, email, password, fullname, parent_id, image_url } =
      request.payload as any

    const res = await userUseCase.addUser({
      username,
      email,
      password,
      fullname,
      parent_id,
      image_url,
    })

    const response = h.response({
      status: 'success',
      data: res,
    })
    response.code(201)
    return response
  }

  async putUserHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { id } = request.params
    const { id: userId } = request.auth.credentials
    const { username, email, password, fullname, image_url } =
      request.payload as any

    const res = await userUseCase.updateUser({
      id,
      user_id: userId as string,
      username,
      email,
      password,
      fullname,
      image_url,
    })

    const response = h.response({
      status: 'success',
      data: res,
    })
    response.code(200)
    return response
  }

  async deleteChildHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { id } = request.params
    const { id: parentId } = request.auth.credentials

    const res = await userUseCase.deleteUser({
      id,
      parent_id: parentId as string,
    })

    const response = h.response({
      status: 'success',
      data: res,
    })
    response.code(200)
    return response
  }
}

export default UsersHandler
