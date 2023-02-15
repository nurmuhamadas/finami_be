import { RegisterPlanningType } from './types'

class RegisterPlanning {
  result: RegisterPlanningType

  constructor(payload: RegisterPlanningType) {
    this._verifyPayload(payload)

    this.result = payload
  }

  _verifyPayload({
    id,
    name,
    amount,
    user_id,
    category_id,
    wallet_id,
  }: RegisterPlanningType) {
    if (id.startsWith('user-') || id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_ID')

    if (name.length > 30) throw new Error('REGISTER_PLANNING.NAME_LIMIT_CHAR')

    if (String(amount) === 'NaN' || amount < 0)
      throw new Error('REGISTER_PLANNING.INVALID_BALANCE')

    if (user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_USER_ID')

    if (category_id.startsWith('category-') || category_id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_CATEGORY_ID')

    if (wallet_id.startsWith('wallet-') || wallet_id.length !== 20)
      throw new Error('REGISTER_PLANNING.INVALID_WALLET_ID')
  }
}

export default RegisterPlanning
