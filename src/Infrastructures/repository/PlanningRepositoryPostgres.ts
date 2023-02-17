import InvariantError from 'Commons/exceptions/InvariantError'
import NotFoundError from 'Commons/exceptions/NotFoundError'
import PlanningRepository from 'Domains/plannings/PlanningRepository'
import FilterPlanning from 'Domains/plannings/entities/FilterPlanning'
import RegisterPlanning from 'Domains/plannings/entities/RegisterPlanning'
import UpdateDataPlanning from 'Domains/plannings/entities/UpdateDataPlanning'
import { PlanningDataType } from 'Domains/plannings/entities/types'
import { Pool } from 'pg'

class PlanningRepositoryPostgres extends PlanningRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
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
    filter?: FilterPlanning | undefined,
  ): Promise<PlanningDataType[]> {
    let _filter = ''
    let count = 1
    const values: any = [userId]

    if (filter) {
      const { wallet_id, month } = filter.values
      if (wallet_id) {
        count += 1
        _filter += ` AND wallet_id = $${count}`
        values.push(wallet_id)
      }
      if (month?.[0] && month?.[1]) {
        count += 1
        _filter += ` AND month >= $${count}`
        values.push(month?.[0])
        count += 1
        _filter += ` AND month <= $${count}`
        values.push(month?.[1])
      }
    }

    const query = {
      text: `SELECT * FROM plannings
              WHERE user_id = $1 AND deleted_at IS NULL
              ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getPlanningById(id: string): Promise<PlanningDataType> {
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

export default PlanningRepositoryPostgres
