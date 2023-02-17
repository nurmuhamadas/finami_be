import { UpdateDataWalletPayload, UpdateDataWalletResult } from './types'

class UpdateDataWallet {
  values: UpdateDataWalletResult

  constructor(payload: UpdateDataWalletPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      updated_at: new Date(),
    }
  }

  _verifyPayload({ name, user_id, balance }: UpdateDataWalletPayload) {
    if (name.length > 30) throw new Error('UPDATE_DATA_WALLET.NAME_LIMIT_CHAR')

    if (user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('UPDATE_DATA_WALLET.INVALID_USER_ID')

    if (String(balance) === 'NaN')
      throw new Error('UPDATE_DATA_WALLET.INVALID_BALANCE')
  }
}

export default UpdateDataWallet
