import { RegisterWalletType } from './types'

class RegisterWallet {
  result: RegisterWalletType

  constructor(payload: RegisterWalletType) {
    this._verifyPayload(payload)

    this.result = payload
  }

  _verifyPayload({ id, name, user_id, balance }: RegisterWalletType) {
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
