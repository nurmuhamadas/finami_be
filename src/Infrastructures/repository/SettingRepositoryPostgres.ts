import InvariantError from 'Commons/exceptions/InvariantError'
import NotFoundError from 'Commons/exceptions/NotFoundError'
import SettingRepository from 'Domains/settings/SettingRepository'
import RegisterSetting from 'Domains/settings/entities/RegisterSetting'
import UpdateDataSetting from 'Domains/settings/entities/UpdateDataSetting'
import { SettingDataType } from 'Domains/settings/entities/types'
import { Pool } from 'pg'

class SettingRepositoryPostgres extends SettingRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addSetting(registerSetting: RegisterSetting): Promise<{ id: string }> {
    const {
      id,
      user_id,
      currency_id,
      date_format,
      created_at,
      updated_at,
      deleted_at,
    } = registerSetting.values
    const query = {
      text: 'INSERT INTO settings VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [
        id,
        user_id,
        currency_id,
        date_format,
        created_at,
        updated_at,
        deleted_at,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updateSetting(
    id: string,
    updateDataSetting: UpdateDataSetting,
  ): Promise<{ id: string }> {
    const { currency_id, date_format, updated_at } = updateDataSetting.values
    const query = {
      text: `UPDATE settings SET currency_id = $1, date_format = $2, updated_at = $3
            WHERE id = $4 AND deleted_at IS NULL RETURNING id`,
      values: [currency_id, date_format, updated_at, id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeleteSettingById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE settings SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreSettingById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE settings SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async getSettingByUserId(userId: string): Promise<SettingDataType> {
    const query = {
      text: 'SELECT * FROM plannings WHERE user_id = $1 AND deleted_at IS NULL',
      values: [userId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('planning not found')
    }

    return {
      ...result.rows?.[0],
    }
  }

  async getSettingById(id: string): Promise<SettingDataType> {
    const query = {
      text: 'SELECT * FROM plannings WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('planning not found')
    }

    return {
      ...result.rows?.[0],
    }
  }
}

export default SettingRepositoryPostgres
