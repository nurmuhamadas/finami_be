import { CategoryFilter } from './types'

class FilterCategory {
  values: CategoryFilter

  constructor(payload: CategoryFilter) {
    this._verifyPayload(payload)

    this.values = payload
  }

  _verifyPayload({ transaction_type }: CategoryFilter) {
    if (transaction_type && !['in', 'out'].includes(transaction_type))
      throw new Error('FILTER_CATEGORY.INVALID_TRANSACTION_TYPE')
  }
}

export default FilterCategory
