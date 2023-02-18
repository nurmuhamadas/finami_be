import { RegisterTransactionPayload, RegisterTransactionResult } from './types'

class RegisterTransaction {
  values: RegisterTransactionResult

  constructor(payload: RegisterTransactionPayload) {
    this._verifyPayload(payload)

    const now = new Date()
    this.values = {
      ...payload,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

  _verifyPayload({
    id,
    amount,
    user_id,
    category_id,
    wallet_id,
    transaction_type,
    image_url,
  }: RegisterTransactionPayload) {
    if (id.startsWith('user-') || id.length !== 20)
      throw new Error('REGISTER_TRANSACTION.INVALID_ID')

    if (String(amount) === 'NaN' || amount < 0)
      throw new Error('REGISTER_TRANSACTION.INVALID_BALANCE')

    if (user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_TRANSACTION.INVALID_USER_ID')

    if (category_id.startsWith('category-') || category_id.length !== 20)
      throw new Error('REGISTER_TRANSACTION.INVALID_CATEGORY_ID')

    if (wallet_id.startsWith('wallet-') || wallet_id.length !== 20)
      throw new Error('REGISTER_TRANSACTION.INVALID_WALLET_ID')

    if (!['in', 'out'].includes(transaction_type))
      throw new Error('REGISTER_TRANSACTION.INVALID_TRANSACTION_TYPE')

    if (
      image_url &&
      image_url.match(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      )
    )
      throw new Error('REGISTER_TRANSACTION.INVALID_IMAGE_URL')
  }
}

export default RegisterTransaction
