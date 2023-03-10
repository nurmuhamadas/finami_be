import { CategoryFilter } from './types'

class FilterCategory {
  values: CategoryFilter

  constructor(payload: CategoryFilter) {
    this._verifyPayload(payload)

    this.values = payload
  }

  _verifyPayload({ transaction_type, include_child }: CategoryFilter) {
    if (transaction_type && !['in', 'out'].includes(transaction_type))
      throw new Error('FILTER_CATEGORY.INVALID_TRANSACTION_TYPE')
    if (include_child !== undefined && typeof include_child !== 'boolean')
      throw new Error('FILTER_CATEGORY.INVALID_INCLUDE_CHILD')
  }
}

export default FilterCategory
