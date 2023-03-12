import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import UsersUseCase from '../../../../Applications/use_case/UsersUseCase'

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

    const { username, email, password, fullname, image_url } =
      request.payload as any

    const res = await userUseCase.addUser({
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
    response.code(201)
    return response
  }

  async postUserMemberHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { username, email, password, fullname, image_url } =
      request.payload as any

    const res = await userUseCase.addUserMember({
      username,
      email,
      password,
      fullname,
      image_url,
      parent_id: userId as string,
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
    const { username, fullname, image_url } = request.payload as any

    const res = await userUseCase.updateUser({
      id,
      user_id: userId as string,
      username,
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

  async putUserMemberHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { id } = request.params
    const { id: userId } = request.auth.credentials
    const { username, fullname, image_url, user_id } = request.payload as any

    const res = await userUseCase.updateUserMember({
      id,
      user_id: user_id,
      username,
      fullname,
      image_url,
      parent_id: userId as string,
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

  async getUsersHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { id: parentId } = request.auth.credentials
    const { member_only } = request.query

    const res = await userUseCase.getUsersByUserId({
      user_id: parentId as string,
      member_only,
    })

    const response = h.response({
      status: 'success',
      data: res,
    })
    response.code(200)
    return response
  }

  async getUserByIdHandler(request: Request, h: any) {
    const userUseCase: UsersUseCase = this._container.getInstance(
      UsersUseCase.name,
    )
    const { id } = request.query
    const { id: userId } = request.auth.credentials

    const res = await userUseCase.getUserById({
      id: id,
      user_id: userId as string,
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
