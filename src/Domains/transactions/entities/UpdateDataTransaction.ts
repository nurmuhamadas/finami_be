import {
  UpdateDataTransactionResult,
  UpdateDataTransactionPayload,
} from './types'

class UpdateDataTransaction {
  values: UpdateDataTransactionResult

  constructor(payload: UpdateDataTransactionPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      updated_at: new Date(),
    }
  }

  _verifyPayload({
    amount,
    category_id,
    transaction_type,
    image_url,
  }: UpdateDataTransactionPayload) {
    if (String(amount) === 'NaN' || amount < 0)
      throw new Error('UPDATE_DATA_TRANSACTION.INVALID_BALANCE')

    if (category_id.startsWith('category-') || category_id.length !== 20)
      throw new Error('UPDATE_DATA_TRANSACTION.INVALID_CATEGORY_ID')

    if (!['in', 'out'].includes(transaction_type))
      throw new Error('UPDATE_DATA_TRANSACTION.INVALID_TRANSACTION_TYPE')

    if (
      image_url &&
      image_url.match(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      )
    )
      throw new Error('UPDATE_DATA_TRANSACTION.INVALID_IMAGE_URL')
  }
}

export default UpdateDataTransaction
