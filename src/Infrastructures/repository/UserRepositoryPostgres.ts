import { GetUserRepoResult } from '../../Domains/users/types'
import AuthorizationError from '../../Commons/exceptions/AuthorizationError'
import InvariantError from '../../Commons/exceptions/InvariantError'
import NotFoundError from '../../Commons/exceptions/NotFoundError'
import UserRepository from '../../Domains/users/UserRepository'
import RegisterUser from '../../Domains/users/entities/RegisterUser'
import UpdateDataUser from '../../Domains/users/entities/UpdateDataUser'
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
  ): Promise<GetUserRepoResult> {
    const { username, fullname, image_url, updated_at } = updateUser.values
    const query = {
      text: `UPDATE users SET username = $1, fullname = $2, image_url = $3,
            updated_at = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING *`,
      values: [username, fullname, image_url, updated_at, id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update user')
    }
    delete result.rows?.[0].password

    return result.rows?.[0]
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
      throw new InvariantError('Username not available')
    }

    return true
  }

  async verifyAvailableEmail(email: string): Promise<boolean> {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    }

    const result = await this._pool.query(query)

    if (result.rowCount) {
      throw new InvariantError('Email not available')
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
      throw new NotFoundError('User not found')
    }

    return {
      password: result.rows?.[0]?.password,
    }
  }

  async getIdByUsername(username: string): Promise<{ id: string }> {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1 AND deleted_at IS NULL',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('User not found')
    }

    return { id: result.rows?.[0]?.id }
  }

  async getUserById(id: string): Promise<GetUserRepoResult> {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('User not found')
    }
    delete result.rows?.[0].password

    return {
      ...result.rows?.[0],
    }
  }

  async getChildByParentId(parentId: string): Promise<GetUserRepoResult[]> {
    const query = {
      text: 'SELECT * FROM users WHERE parent_id = $1 AND deleted_at IS NULL',
      values: [parentId],
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async verifyUserAccess(id: string, userId: string): Promise<boolean> {
    const query = {
      text: `SELECT id, parent_id FROM users
            WHERE id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('User not found')
    }
    if (result.rows[0].id !== userId && result.rows[0].parent_id !== userId) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyUserParent(id: string, parentId: string): Promise<boolean> {
    const query = {
      text: `SELECT parent_id FROM users
            WHERE id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('User not found')
    }
    if (result.rows[0].parent_id !== parentId) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyAvailableParent(parentId: string): Promise<boolean> {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
      values: [parentId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Parent not found')
    }

    return {
      ...result.rows?.[0],
    }
  }
}

export default UserRepositoryPostgres
