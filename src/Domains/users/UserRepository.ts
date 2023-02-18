import RegisterUser from './entities/RegisterUser'
import UpdateDataUser from './entities/UpdateDataUser'
import { GetUserResult, GetUsersResult } from './types'

class UserRepository {
  async addUser(registerUser: RegisterUser): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateUser(
    id: string,
    updateUser: UpdateDataUser,
  ): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteUserById(id: string): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreUserById(id: string): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyAvailableUsername(username: string): Promise<boolean> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPasswordByUsername(username: string): Promise<{ password: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getIdByUsername(username: string): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getUserById(id: string): Promise<GetUserResult> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getChildByParentId(parentId: string): Promise<GetUsersResult> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default UserRepository
