import AuthorizationError from '../../Commons/exceptions/AuthorizationError'
import InvariantError from '../../Commons/exceptions/InvariantError'
import NotFoundError from '../../Commons/exceptions/NotFoundError'
import SettingRepository from '../../Domains/settings/SettingRepository'
import RegisterSetting from '../../Domains/settings/entities/RegisterSetting'
import UpdateDataSetting from '../../Domains/settings/entities/UpdateDataSetting'
import { GetSettingResult } from '../../Domains/settings/types'
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

  async getSettingByUserId(userId: string): Promise<GetSettingResult> {
    const query = {
      text: 'SELECT * FROM settings WHERE user_id = $1 AND deleted_at IS NULL',
      values: [userId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('setting not found')
    }

    return {
      ...result.rows?.[0],
    }
  }

  async getSettingById(id: string): Promise<GetSettingResult> {
    const query = {
      text: 'SELECT * FROM settings WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('setting not found')
    }

    return {
      ...result.rows?.[0],
    }
  }

  async softDeleteSettingByParentId(parentId: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE settings s SET s.deleted_at = NOW() FROM users u
            WHERE u.parent_id = s.user_id AND u.parent_id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [parentId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreSettingByParentId(parentId: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE settings s SET s.deleted_at = NULL FROM users u
            WHERE u.parent_id = s.user_id AND u.parent_id = $1 AND deleted_at IS NOT NULL RETURNING id`,
      values: [parentId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore setting')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async verifySettingAccess(id: string, parentId: string): Promise<boolean> {
    const query = {
      text: `SELECT u.parent_id FROM settings s JOIN users u ON s.user_id = u.id
            WHERE s.id = $1`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('setting not found')
    }
    if (result.rows?.[0]?.parent_id !== parentId) {
      throw new AuthorizationError('You not allowed to perform this action')
    }

    return true
  }

  async verifySettingOwner(id: string, userId: string): Promise<boolean> {
    const query = {
      text: `SELECT user_id FROM settings WHERE id = $1`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('setting not found')
    }
    if (result.rows?.[0]?.user_id !== userId) {
      throw new AuthorizationError('You not allowed to access this record')
    }

    return true
  }
}

export default SettingRepositoryPostgres
