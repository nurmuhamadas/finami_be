import InvariantError from '../../Commons/exceptions/InvariantError'
import AuthRepository from '../../Domains/authentication/AuthRepository'
import { Pool } from 'pg'

class AuthRepositoryPostgres extends AuthRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addToken(token: string): Promise<void> {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    }

    await this._pool.query(query)
  }

  async checkAvailabilityToken(token: string): Promise<boolean> {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    }

    const result = await this._pool.query(query)

    if (result.rows.length === 0) {
      throw new InvariantError('invalid refresh token')
    }

    return true
  }

  async deleteToken(token: string): Promise<void> {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    }

    await this._pool.query(query)
  }
}

export default AuthRepositoryPostgres
