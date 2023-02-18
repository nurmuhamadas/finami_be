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

  _verifyPayload({ name, balance }: UpdateDataWalletPayload) {
    if (name && name.length > 30)
      throw new Error('UPDATE_DATA_WALLET.NAME_LIMIT_CHAR')

    if (balance && String(balance) === 'NaN')
      throw new Error('UPDATE_DATA_WALLET.INVALID_BALANCE')
  }
}

export default UpdateDataWallet
