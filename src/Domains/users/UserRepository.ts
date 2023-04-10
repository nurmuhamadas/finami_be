import RegisterUser from './entities/RegisterUser'
import UpdateDataUser from './entities/UpdateDataUser'
import { GetUserRepoResult } from './types'

class UserRepository {
  async addUser(registerUser: RegisterUser): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateUser(
    id: string,
    updateUser: UpdateDataUser,
  ): Promise<GetUserRepoResult> {
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

  async verifyAvailableEmail(email: string): Promise<boolean> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPasswordByUsername(username: string): Promise<{ password: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getIdByUsername(username: string): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getUserById(id: string): Promise<GetUserRepoResult> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getChildByParentId(parentId: string): Promise<GetUserRepoResult[]> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyUserAccess(id: string, userId: string): Promise<boolean> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyUserParent(id: string, parentId: string): Promise<boolean> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyAvailableParent(parentId: string): Promise<boolean> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default UserRepository
