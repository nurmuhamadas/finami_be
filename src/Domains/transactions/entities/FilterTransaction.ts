import { TransactionFilterType } from './types'

class FilterTransaction {
  values: TransactionFilterType

  constructor(payload: TransactionFilterType) {
    this._verifyPayload(payload)

    this.values = payload
  }

  _verifyPayload({
    transaction_type,
    date_range,
    category_id,
    wallet_id,
    sort_by,
    order_by,
  }: TransactionFilterType) {
    if (transaction_type && !['in', 'out'].includes(transaction_type))
      throw new Error('FILTER_TRANSACTION.INVALID_TRANSACTION_TYPE')

    if (date_range) {
      if (!date_range[0] || !date_range[1])
        throw new Error('FILTER_TRANSACTION.DATE_RANGE_NOT_COMPLETE')
      if (date_range[0] > date_range[1])
        throw new Error('FILTER_TRANSACTION.START_DATE_SHOULD_BEFORE_END_DATE')
    }

    if (
      category_id &&
      (!category_id.startsWith('category-') || category_id.length !== 20)
    )
      throw new Error('FILTER_TRANSACTION.INVALID_CATEGORY_ID')

    if (
      wallet_id &&
      (!wallet_id.startsWith('wallet-') || wallet_id.length !== 20)
    )
      throw new Error('FILTER_TRANSACTION.INVALID_WALLET_ID')

    if (sort_by && !['amount'].includes(sort_by))
      throw new Error('FILTER_TRANSACTION.INVALID_SORT_BY')

    if (order_by && !['asc', 'desc'].includes(order_by))
      throw new Error('FILTER_TRANSACTION.INVALID_ORDER_BY')
  }
}

export default FilterTransaction
