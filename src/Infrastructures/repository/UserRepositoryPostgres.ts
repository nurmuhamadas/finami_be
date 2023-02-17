import InvariantError from 'Commons/exceptions/InvariantError'
import NotFoundError from 'Commons/exceptions/NotFoundError'
import UserRepository from 'Domains/users/UserRepository'
import RegisterUser from 'Domains/users/entities/RegisterUser'
import UpdateDataUser from 'Domains/users/entities/UpdateDataUser'
import { GetUserResult, GetUsersResult } from 'Domains/users/types'
import { Pool } from 'pg'

class UserRepositoryPostgres extends UserRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addUser(registerUser: RegisterUser): Promise<{ id: string }> {
    const {
      id,
      username,
      email,
      password,
      fullname,
      image_url,
      parent_id,
      created_at,
      updated_at,
      deleted_at,
    } = registerUser.values
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [
        id,
        username,
        email,
        password,
        fullname,
        image_url,
        parent_id,
        created_at,
        updated_at,
        deleted_at,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add user')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updateUser(
    id: string,
    updateUser: UpdateDataUser,
  ): Promise<{ id: string }> {
    const {
      username,
      email,
      password,
      fullname,
      image_url,
      parent_id,
      updated_at,
    } = updateUser.values
    const query = {
      text: `UPDATE users SET username = $1, email = $2, password = $3, fullname = $4,
            image_url = $5, parent_id = $6, updated_at = $7 WHERE id = $8 AND deleted_at IS NULL RETURNING id`,
      values: [
        username,
        email,
        password,
        fullname,
        image_url,
        parent_id,
        updated_at,
        id,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update user')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeleteUserById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE users SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete user')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreUserById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE users SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore user')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async verifyAvailableUsername(username: string): Promise<boolean> {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (result.rowCount) {
      throw new InvariantError('username not available')
    }

    return true
  }

  async getPasswordByUsername(username: string): Promise<{ password: string }> {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1 AND deleted_at IS NULL',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('user not found')
    }

    return result.rows?.[0]?.password
  }

  async getIdByUsername(username: string): Promise<{ id: string }> {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1 AND deleted_at IS NULL',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('user not found')
    }

    return { id: result.rows?.[0]?.id }
  }

  async getUserById(id: string): Promise<GetUserResult> {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('user not found')
    }

    return {
      ...result.rows?.[0],
    }
  }

  async getChildByParentId(parentId: string): Promise<GetUsersResult> {
    const query = {
      text: 'SELECT * FROM users WHERE parent_id = $1 AND deleted_at IS NULL',
      values: [parentId],
    }

    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = UserRepositoryPostgres
