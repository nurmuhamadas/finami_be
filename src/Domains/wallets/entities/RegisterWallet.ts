import { RegisterWalletPayload, RegisterWalletResult } from './types'

class RegisterWallet {
  values: RegisterWalletResult

  constructor(payload: RegisterWalletPayload) {
    this._verifyPayload(payload)

    const now = new Date()
    this.values = {
      ...payload,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

  _verifyPayload({ id, name, user_id, balance }: RegisterWalletPayload) {
    if (id.startsWith('user-') || id.length !== 20)
      throw new Error('REGISTER_WALLET.INVALID_ID')

    if (name.length > 30) throw new Error('REGISTER_WALLET.NAME_LIMIT_CHAR')

    if (user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_WALLET.INVALID_USER_ID')

    if (String(balance) === 'NaN')
      throw new Error('REGISTER_WALLET.INVALID_BALANCE')
  }
}

export default RegisterWallet
