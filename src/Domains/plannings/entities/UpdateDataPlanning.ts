import { UpdateDataPlanningResult, UpdateDataPlanningPayload } from './types'

class UpdateDataPlanning {
  values: UpdateDataPlanningResult

  constructor(payload: UpdateDataPlanningPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      updated_at: new Date(),
    }
  }

  _verifyPayload({
    name,
    amount,
    user_id,
    category_id,
    wallet_id,
  }: UpdateDataPlanningPayload) {
    if (name.length > 30)
      throw new Error('UPDATE_DATA_PLANNING.NAME_LIMIT_CHAR')

    if (String(amount) === 'NaN' || amount < 0)
      throw new Error('UPDATE_DATA_PLANNING.INVALID_BALANCE')

    if (!user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('UPDATE_DATA_PLANNING.INVALID_USER_ID')

    if (!category_id.startsWith('category-') || category_id.length !== 20)
      throw new Error('UPDATE_DATA_PLANNING.INVALID_CATEGORY_ID')

    if (!wallet_id.startsWith('wallet-') || wallet_id.length !== 20)
      throw new Error('UPDATE_DATA_PLANNING.INVALID_WALLET_ID')
  }
}

export default UpdateDataPlanning
