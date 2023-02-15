import {
  RegisterUserType,
  UpdateDataUserType,
  UserDataType,
} from './entities/types'

class UserRepository {
  async addUser(registerUser: RegisterUserType): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateUser(
    id: string,
    updateUser: UpdateDataUserType,
  ): Promise<{ id: string }> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteUserById(id: string): Promise<{ id: string }> {
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

  async getUserById(id: string): Promise<UserDataType> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getChildByParentId(parentId: string): Promise<UserDataType[]> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default UserRepository
