import InvariantError from 'Commons/exceptions/InvariantError'
import NotFoundError from 'Commons/exceptions/NotFoundError'
import TransactionRepository from 'Domains/transactions/TransactionRepository'
import FilterTransaction from 'Domains/transactions/entities/FilterTransaction'
import RegisterTransaction from 'Domains/transactions/entities/RegisterTransaction'
import UpdateDataTransaction from 'Domains/transactions/entities/UpdateDataTransaction'
import {
  GetTransactionResult,
  GetTransactionsResult,
} from 'Domains/transactions/types'
import { Pool } from 'pg'

class TransactionRepositoryPostgres extends TransactionRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addTransaction(
    registerTransaction: RegisterTransaction,
  ): Promise<{ id: string }> {
    const {
      id,
      amount,
      description,
      transaction_type,
      date,
      image_url,
      user_id,
      wallet_id,
      category_id,
      created_at,
      updated_at,
      deleted_at,
    } = registerTransaction.values
    const query = {
      text: 'INSERT INTO transactions VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
      values: [
        id,
        amount,
        description,
        transaction_type,
        date,
        image_url,
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
      throw new InvariantError('Failed to add transaction')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updateTransaction(
    id: string,
    updateDataTransaction: UpdateDataTransaction,
  ): Promise<{ id: string }> {
    const {
      amount,
      description,
      transaction_type,
      date,
      image_url,
      user_id,
      wallet_id,
      category_id,
      updated_at,
    } = updateDataTransaction.values
    const query = {
      text: `UPDATE transactions SET amount = $1, descriptions = $2, transaction_type = $3, date = $4,
            image_url = $5, user_id = $6, wallet_id = $7, category_id = $8, updated_at = $9
            WHERE id = $10 AND deleted_at IS NULL RETURNING id`,
      values: [
        amount,
        description,
        transaction_type,
        date,
        image_url,
        user_id,
        wallet_id,
        category_id,
        updated_at,
        id,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update transactions')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeleteTransactionById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE transactions SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete transaction')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreTransactionById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE transactions SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore transaction')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async getTransactionsByUserId(
    userId: string,
    filter?: FilterTransaction | undefined,
  ): Promise<GetTransactionsResult> {
    let _filter = ''
    let count = 1
    const values: any[] = [userId]

    if (filter) {
      const {
        transaction_type,
        date_range,
        category_id,
        wallet_id,
        search_key,
        limit,
        offset,
        sort_by,
        order_by,
      } = filter.values
      if (transaction_type) {
        count += 1
        _filter += ` AND transaction_type = $${count}`
        values.push(transaction_type)
      }
      if (date_range?.[0] && date_range?.[1]) {
        count += 1
        _filter += ` AND date >= $${count}`
        values.push(date_range?.[0])
        count += 1
        _filter += ` AND date <= $${count}`
        values.push(date_range?.[1])
      }
      if (category_id) {
        count += 1
        _filter += ` AND category_id = $${count}`
        values.push(category_id)
      }
      if (wallet_id) {
        count += 1
        _filter += ` AND wallet_id = $${count}`
        values.push(wallet_id)
      }
      if (search_key) {
        count += 1
        _filter += ` AND description = %$${count}%`
        values.push(search_key)
      }
      if (limit) {
        count += 1
        _filter += ` LIMIT = $${count}`
        values.push(limit)
      }
      if (offset) {
        count += 1
        _filter += ` OFFSET = $${count}`
        values.push(offset)
      }
      if (sort_by) {
        count += 1
        _filter += ` SORT_BY $${count}`
        values.push(sort_by)
      }
      if (order_by) {
        count += 1
        _filter += ` ORDER_BY $${count}`
        values.push(sort_by)
      }
    }

    const query = {
      text: `SELECT t.*, u.username FROM transactions t
            LEFT JOIN users u ON t.user_id = u.id
            WHERE (u.id = $1 OR u.parent_id = $1) AND deleted_at IS NULL
            ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getTransactionById(id: string): Promise<GetTransactionResult> {
    const query = {
      text: `SELECT t.*, u.username FROM transactions t
            LEFT JOIN users u ON t.user_id = u.id
            WHERE t.id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('transaction not found')
    }

    return {
      ...result.rows?.[0],
    }
  }
}

export default TransactionRepositoryPostgres
