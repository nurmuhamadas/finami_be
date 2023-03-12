import { WalletsDataRepoType } from '../../Domains/wallets/types'
import AuthorizationError from '../../Commons/exceptions/AuthorizationError'
import InvariantError from '../../Commons/exceptions/InvariantError'
import NotFoundError from '../../Commons/exceptions/NotFoundError'
import WalletRepository from '../../Domains/wallets/WalletRepository'
import RegisterWallet from '../../Domains/wallets/entities/RegisterWallet'
import UpdateDataWallet from '../../Domains/wallets/entities/UpdateDataWallet'
import { Pool } from 'pg'

class WalletRepositoryPostgres extends WalletRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addWallet(registerWallet: RegisterWallet): Promise<{ id: string }> {
    const { id, name, balance, user_id, created_at, updated_at, deleted_at } =
      registerWallet.values
    const query = {
      text: 'INSERT INTO wallets VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, balance, user_id, created_at, updated_at, deleted_at],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add wallet')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updateWallet(
    id: string,
    updateDataWallet: UpdateDataWallet,
  ): Promise<{ id: string }> {
    const { name, balance, updated_at } = updateDataWallet.values
    const query = {
      text: `UPDATE wallets SET name = $1, balance = $2, updated_at = $3
            WHERE id = $4 AND deleted_at IS NULL RETURNING id`,
      values: [name, balance, updated_at, id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update wallet')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeleteWalletById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE wallets SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete wallet')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreWalletById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE wallets SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore wallet')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async verifyWalletWriteAccess(id: string, userId: string): Promise<boolean> {
    const query = {
      text: `SELECT user_id FROM wallets
            WHERE id = $1 AND deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('Wallet not found')
    }
    if (result.rows[0].user_id !== userId) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async verifyWalletReadAccess(id: string, userId: string): Promise<boolean> {
    const query = {
      text: `SELECT w.user_id, u.parent_id FROM wallets w
            JOIN users u ON w.user_id = u.id
            WHERE w.id = $1 AND w.deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('Wallet not found')
    }
    if (
      result.rows[0].user_id !== userId &&
      result.rows[0].parent_id !== userId
    ) {
      throw new AuthorizationError('Not allowed to access this record')
    }

    return true
  }

  async getWalletsByUserId(userId: string): Promise<WalletsDataRepoType[]> {
    const query = {
      text: `SELECT w.*, u.username, u.username AS user_name, u.fullname AS user_fullname FROM wallets w
            LEFT JOIN users u ON w.user_id = u.id
            WHERE u.id = $1 AND w.deleted_at IS NULL`,
      values: [userId],
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  // Include child wallet
  async getAllWallets(parentId: string): Promise<WalletsDataRepoType[]> {
    const query = {
      text: `SELECT w.*, u.username, u.username AS user_name, u.fullname AS user_fullname FROM wallets w
            LEFT JOIN users u ON w.user_id = u.id
            WHERE (u.id = $1 OR u.parent_id = $1) AND w.deleted_at IS NULL`,
      values: [parentId],
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getWalletById(id: string): Promise<WalletsDataRepoType> {
    const query = {
      text: `SELECT w.*, u.username FROM wallets w
            LEFT JOIN users u ON w.user_id = u.id
            WHERE w.id = $1 AND w.deleted_at IS NULL`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('wallet not found')
    }

    return {
      ...result.rows?.[0],
    }
  }

  async increaseWalletBalance(
    walletId: string,
    amount: number,
  ): Promise<{ id: string }> {
    const query = {
      text: `UPDATE wallets SET balance = balance + $1
            WHERE id = $2 AND deleted_at IS NULL RETURNING id`,
      values: [amount, walletId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('wallet not found')
    }

    return {
      id: result.rows[0].id,
    }
  }

  async reduceWalletBalance(
    walletId: string,
    amount: number,
  ): Promise<{ id: string }> {
    const query = {
      text: `UPDATE wallets SET balance = balance - $1
            WHERE id = $2 AND deleted_at IS NULL RETURNING id`,
      values: [amount, walletId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('wallet not found')
    }

    return {
      id: result.rows[0].id,
    }
  }
}

export default WalletRepositoryPostgres
