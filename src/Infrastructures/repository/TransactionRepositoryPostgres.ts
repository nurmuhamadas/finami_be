import { TransactionDataRepoType } from '../../Domains/transactions/types'
import AuthorizationError from '../../Commons/exceptions/AuthorizationError'
import InvariantError from '../../Commons/exceptions/InvariantError'
import NotFoundError from '../../Commons/exceptions/NotFoundError'
import TransactionRepository from '../../Domains/transactions/TransactionRepository'
import FilterTransaction from '../../Domains/transactions/entities/FilterTransaction'
import RegisterTransaction from '../../Domains/transactions/entities/RegisterTransaction'
import UpdateDataTransaction from '../../Domains/transactions/entities/UpdateDataTransaction'
import { Pool } from 'pg'

class TransactionRepositoryPostgres extends TransactionRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addTransaction(
    registerTransaction: RegisterTransaction,
  ): Promise<TransactionDataRepoType> {
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
      text: 'INSERT INTO transactions VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
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
      ...result.rows?.[0],
    }
  }

  async updateTransaction(
    id: string,
    updateDataTransaction: UpdateDataTransaction,
  ): Promise<TransactionDataRepoType> {
    const {
      amount,
      description,
      transaction_type,
      date,
      image_url,
      category_id,
      updated_at,
    } = updateDataTransaction.values
    const query = {
      text: `UPDATE transactions SET amount = $1, descriptions = $2, transaction_type = $3,
            date = $4, image_url = $5, category_id = $6, updated_at = $7
            WHERE id = $8 AND deleted_at IS NULL RETURNING *`,
      values: [
        amount,
        description,
        transaction_type,
        date,
        image_url,
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
      ...result.rows?.[0],
    }
  }

  async softDeleteTransactionById(
    id: string,
  ): Promise<TransactionDataRepoType> {
    const query = {
      text: `UPDATE transactions SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING *`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete transaction')
    }

    return {
      ...result.rows[0],
    }
  }

  async restoreTransactionById(id: string): Promise<TransactionDataRepoType> {
    const query = {
      text: `UPDATE transactions SET deleted_at = NULL WHERE id = $1 RETURNING *`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore transaction')
    }

    return {
      ...result.rows[0],
    }
  }

  async getTransactionsByUserId(
    userId: string,
    filter?: FilterTransaction | undefined,
  ): Promise<TransactionDataRepoType[]> {
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
        _filter += ` AND t.transaction_type = $${count}`
        values.push(transaction_type)
      }
      if (date_range?.[0] && date_range?.[1]) {
        count += 1
        _filter += ` AND t.date >= $${count}`
        values.push(date_range?.[0])
        count += 1
        _filter += ` AND t.date <= $${count}`
        values.push(date_range?.[1])
      }
      if (category_id) {
        count += 1
        _filter += ` AND t.category_id = $${count}`
        values.push(category_id)
      }
      if (wallet_id) {
        count += 1
        _filter += ` AND t.wallet_id = $${count}`
        values.push(wallet_id)
      }
      if (search_key) {
        count += 1
        _filter += ` AND t.descriptions ILIKE $${count}`
        values.push(`%${search_key}%`)
      }

      _filter += ` ORDER BY t.${sort_by} ${order_by}`

      if (limit) {
        count += 1
        _filter += ` LIMIT $${count}`
        values.push(limit)
      }
      if (offset) {
        count += 1
        _filter += ` OFFSET $${count}`
        values.push(offset)
      }
    }

    const query = {
      text: `SELECT t.*, u.username AS user_name, u.fullname AS user_fullname,
            w.name AS wallet_name, c.name AS category_name FROM transactions t
            JOIN users u ON t.user_id = u.id
            JOIN wallets w ON t.wallet_id = w.id
            JOIN categories c ON t.category_id = c.id
            WHERE (u.id = $1 OR u.parent_id = $1) AND t.deleted_at IS NULL
            ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getTransactionById(id: string): Promise<TransactionDataRepoType> {
    const query = {
      text: `SELECT t.*, u.username AS user_name, u.fullname AS user_fullname,
            w.name AS wallet_name, c.name AS category_name FROM transactions t
            JOIN users u ON t.user_id = u.id
            JOIN wallets w ON t.wallet_id = w.id
            JOIN categories c ON t.category_id = c.id
            WHERE t.id = $1 AND t.deleted_at IS NULL`,
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

  async verifyTransactionWriteAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    const query = {
      text: `SELECT user_id FROM transactions
            WHERE id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('Transaction not found')
    }
    if (result.rows[0].user_id !== userId) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyTransactionReadAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    const query = {
      text: `SELECT u.parent_id, t.user_id FROM transactions t
            JOIN users u ON t.user_id = u.id
            WHERE t.id = $1 AND t.deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('Transaction not found')
    }
    if (
      result.rows[0].user_id !== userId &&
      result.rows[0].parent_id !== userId
    ) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async softDeleteTransactionsByWalletId(
    walletId: string,
  ): Promise<{ deletedRow: number }> {
    const query = {
      text: `UPDATE transactions SET deleted_at = NOW()
            WHERE wallet_id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [walletId],
    }

    const result = await this._pool.query(query)

    return {
      deletedRow: result.rowCount,
    }
  }
}

export default TransactionRepositoryPostgres
