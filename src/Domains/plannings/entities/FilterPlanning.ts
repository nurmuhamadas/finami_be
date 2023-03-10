import { PlanningFilter } from './types'

class FilterPlanning {
  values: PlanningFilter

  constructor(payload: PlanningFilter) {
    this._verifyPayload(payload)

    this.values = payload
  }

  _verifyPayload({
    wallet_id,
    month,
    category_id,
    search_key,
  }: PlanningFilter) {
    if (
      wallet_id &&
      (!wallet_id.startsWith('wallet-') || wallet_id.length !== 20)
    )
      throw new Error('PLANNING_FILTER.INVALID_WALLET_ID')

    if (
      category_id &&
      (!category_id.startsWith('category-') || category_id.length !== 20)
    )
      throw new Error('PLANNING_FILTER.INVALID_CATEGORY_ID')

    if (search_key && typeof search_key !== 'string')
      throw new Error('PLANNING_FILTER.INVALID_SEARCH_KEY')

    if (month) {
      if (month[0] > month[1])
        throw new Error('PLANNING_FILTER.START_DATE_SHOULD_BEFORE_END_DATE')
    }
  }
}

export default FilterPlanning
