import { PlanningDataRepoType } from '../../Domains/plannings/types'
import AuthorizationError from '../../Commons/exceptions/AuthorizationError'
import InvariantError from '../../Commons/exceptions/InvariantError'
import NotFoundError from '../../Commons/exceptions/NotFoundError'
import PlanningRepository from '../../Domains/plannings/PlanningRepository'
import FilterPlanning from '../../Domains/plannings/entities/FilterPlanning'
import RegisterPlanning from '../../Domains/plannings/entities/RegisterPlanning'
import UpdateDataPlanning from '../../Domains/plannings/entities/UpdateDataPlanning'
import { Pool } from 'pg'

class PlanningRepositoryPostgres extends PlanningRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  private _generateFilter(
    userId: string,
    filter: FilterPlanning,
    includeUserQuery = true,
  ) {
    let _filter = ''
    let count = includeUserQuery ? 0 : 1
    const values: any = includeUserQuery ? [] : [userId]

    if (filter) {
      const { wallet_id, month, category_id, search_key, user_query_id } =
        filter.values
      if (wallet_id) {
        count += 1
        _filter += ` AND p.wallet_id = $${count}`
        values.push(wallet_id)
      }
      if (category_id) {
        count += 1
        _filter += ` AND p.category_id = $${count}`
        values.push(category_id)
      }
      if (includeUserQuery && user_query_id) {
        count += 1
        _filter += ` AND p.user_id = $${count}`
        values.push(user_query_id)
      }
      if (search_key) {
        count += 1
        _filter += ` AND p.name ILIKE $${count}`
        values.push(`%${search_key}%`)
      }
      if (month?.[0]) {
        count += 1
        _filter += ` AND p.month >= $${count}`
        values.push(month?.[0])
      }
      if (month?.[1]) {
        count += 1
        _filter += ` AND p.month <= $${count}`
        values.push(month?.[1])
      }
    }

    return {
      filter: _filter,
      values,
    }
  }

  async addPlanning(
    registerPlanning: RegisterPlanning,
  ): Promise<{ id: string }> {
    const {
      id,
      name,
      amount,
      month,
      user_id,
      wallet_id,
      category_id,
      created_at,
      updated_at,
      deleted_at,
    } = registerPlanning.values
    const query = {
      text: 'INSERT INTO plannings VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [
        id,
        name,
        amount,
        month,
        user_id,
        wallet_id,
        category_id,
        created_at,
        updated_at,
        deleted_at,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add planning')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updatePlanning(
    id: string,
    updateDataPlanning: UpdateDataPlanning,
  ): Promise<{ id: string }> {
    const { name, amount, user_id, wallet_id, category_id, updated_at } =
      updateDataPlanning.values
    const query = {
      text: `UPDATE plannings SET name = $1, amount = $2, user_id = $3, wallet_id = $4,
            category_id = $5, updated_at = $6 WHERE id = $7 AND deleted_at IS NULL RETURNING id`,
      values: [name, amount, user_id, wallet_id, category_id, updated_at, id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update planning')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeletePlanningById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE plannings SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete planning')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restorePlanningById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE plannings SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore planning')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async getPlanningsByUserId(
    userId: string,
    filter: FilterPlanning,
  ): Promise<PlanningDataRepoType[]> {
    const { filter: _filter, values } = this._generateFilter(userId, filter)

    const query = {
      text: `SELECT p.*, u.username AS user_name, u.fullname AS user_fullname,
            c.name AS category_name, w.name AS wallet_name FROM plannings p
            JOIN users u ON p.user_id = u.id
            JOIN categories c ON p.category_id = c.id
            JOIN wallets w ON p.wallet_id = w.id
            WHERE p.deleted_at IS NULL
            ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getAllPlannings(
    userId: string,
    filter: FilterPlanning,
  ): Promise<PlanningDataRepoType[]> {
    const { filter: _filter, values } = this._generateFilter(
      userId,
      filter,
      false,
    )

    const query = {
      text: `SELECT p.*, u.username AS user_name, u.fullname AS user_fullname,
            c.name AS category_name, w.name AS wallet_name FROM plannings p
            JOIN users u ON p.user_id = u.id
            JOIN categories c ON p.category_id = c.id
            JOIN wallets w ON p.wallet_id = w.id
            WHERE (u.id = $1 OR u.parent_id = $1) AND p.deleted_at IS NULL
            ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getPlanningById(id: string): Promise<PlanningDataRepoType> {
    const query = {
      text: `SELECT p.*, u.username AS user_name, u.fullname AS user_fullname,
            c.name AS category_name, w.name AS wallet_name FROM plannings p
            JOIN users u ON p.user_id = u.id
            JOIN categories c ON p.category_id = c.id
            JOIN wallets w ON p.wallet_id = w.id
            WHERE p.id = $1 AND p.deleted_at IS NULL`,
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

  async verifyPlanningWriteAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    const query = {
      text: `SELECT user_id FROM plannings
            WHERE id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('planning not found')
    }
    if (result.rows[0].user_id !== userId) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyPlanningReadAccess(id: string, userId: string): Promise<boolean> {
    const query = {
      text: `SELECT p.user_id, u.parent_id FROM plannings p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = $1 AND p.deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('planning not found')
    }
    if (
      result.rows[0].user_id !== userId &&
      result.rows[0].parent_id !== userId
    ) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyAvailableNameThisMonth(
    userId: string,
    planName: string,
    month: Date,
  ): Promise<boolean> {
    const query = {
      text: `SELECT month FROM plannings
            WHERE user_id = $1 AND name = $2 AND p.deleted_at IS NULL`,
      values: [userId, planName],
    }

    const result = await this._pool.query(query)
    const dResult = new Date(result.rows[0].month)
    const dParams = new Date(month)

    if (
      dResult.getMonth() === dParams.getMonth() &&
      dResult.getFullYear() === dParams.getFullYear()
    ) {
      throw new InvariantError(
        'Planning name is not available for this month, please change!',
      )
    }

    return true
  }
}

export default PlanningRepositoryPostgres
