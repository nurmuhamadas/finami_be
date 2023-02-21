import { categoryGroup } from '../../../Commons/utils/consts'
import { UpdateDataCategoryResult, UpdateDataCategoryPayload } from './types'

class UpdateDataCategory {
  values: UpdateDataCategoryResult

  constructor(payload: UpdateDataCategoryPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      icon_url: payload.icon_url || null,
      updated_at: new Date(),
    }
  }

  _verifyPayload({
    name,
    icon_url,
    transaction_type,
    user_id,
    group,
  }: UpdateDataCategoryPayload) {
    if (name.length > 30)
      throw new Error('UPDATE_DATA_CATEGORY.NAME_LIMIT_CHAR')

    if (
      icon_url &&
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
        icon_url,
      )
    )
      throw new Error('UPDATE_DATA_CATEGORY.INVALID_ICON_URL')

    if (!['in', 'out'].includes(transaction_type))
      throw new Error('UPDATE_DATA_CATEGORY.INVALID_TRANSACTION_TYPE')

    if (!user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('UPDATE_DATA_CATEGORY.INVALID_USER_ID')

    if (
      !categoryGroup.includes(group) ||
      (transaction_type === 'in' && group !== 'Income') ||
      (transaction_type === 'out' && group === 'Income')
    )
      throw new Error('REGISTER_CATEGORY.INVALID_GROUP')
  }
}

export default UpdateDataCategory
