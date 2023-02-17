import InvariantError from 'Commons/exceptions/InvariantError'
import NotFoundError from 'Commons/exceptions/NotFoundError'
import CategoryRepository from 'Domains/categories/CategoryRepository'
import FilterCategory from 'Domains/categories/entities/FilterCategory'
import RegisterCategory from 'Domains/categories/entities/RegisterCategory'
import UpdateDataCategory from 'Domains/categories/entities/UpdateDataCategory'
import {
  CategoryDataType,
  CategoryFilter,
  RegisterCategoryType,
  UpdateDataCategoryType,
} from 'Domains/categories/entities/types'
import { Pool } from 'pg'

class CategoryRepositoryPostgres extends CategoryRepository {
  _pool: Pool

  constructor(pool: Pool) {
    super()
    this._pool = pool
  }

  async addCategory(
    registerCategory: RegisterCategory,
  ): Promise<{ id: string }> {
    const {
      id,
      name,
      icon_url,
      user_id,
      transaction_type,
      group,
      created_at,
      updated_at,
      deleted_at,
    } = registerCategory.values
    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        name,
        icon_url,
        user_id,
        transaction_type,
        group,
        created_at,
        updated_at,
        deleted_at,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add category')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async updateCategory(
    id: string,
    updateDataCategory: UpdateDataCategory,
  ): Promise<{ id: string }> {
    const { name, icon_url, user_id, transaction_type, group, updated_at } =
      updateDataCategory.values
    const query = {
      text: `UPDATE categories SET name = $1, icon_url = $2, user_id = $3, transaction_type = $4,
            group = $5, updated_at = $6 WHERE id = $7 AND deleted_at IS NULL RETURNING id`,
      values: [
        name,
        icon_url,
        user_id,
        transaction_type,
        group,
        updated_at,
        id,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to update category')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async softDeleteCategoryById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE categories SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete category')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async restoreCategoryById(id: string): Promise<{ id: string }> {
    const query = {
      text: `UPDATE categories SET deleted_at = NULL WHERE id = $1 RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to restore category')
    }

    return {
      id: result.rows?.[0]?.id,
    }
  }

  async getCategoriesByUserId(
    userId: string,
    filter?: FilterCategory,
  ): Promise<CategoryDataType[]> {
    let _filter = ''
    const values = [userId]

    if (filter) {
      const { transaction_type } = filter.values
      if (transaction_type) {
        _filter += 'AND transaction_type = $2'
        values.push(transaction_type)
      }
    }

    const query = {
      text: `SELECT * FROM categories
              WHERE user_id = $1 AND deleted_at IS NULL
              ${_filter}`,
      values,
    }

    const result = await this._pool.query(query)
    return result.rows
  }

  async getCategoryById(id: string): Promise<CategoryDataType> {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('category not found')
    }

    return {
      ...result.rows?.[0],
    }
  }
}

export default CategoryRepositoryPostgres