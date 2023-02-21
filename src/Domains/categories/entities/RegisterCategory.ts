import { categoryGroup } from '../../../Commons/utils/consts'
import { RegisterCategoryResult, RegisterCategoryPayload } from './types'

class RegisterCategory {
  values: RegisterCategoryResult

  constructor(payload: RegisterCategoryPayload) {
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
    name,
    icon_url,
    transaction_type,
    user_id,
    group,
  }: RegisterCategoryPayload) {
    if (!id.startsWith('category-') || id.length !== 20)
      throw new Error('REGISTER_CATEGORY.INVALID_ID')

    if (name.length > 30) throw new Error('REGISTER_CATEGORY.NAME_LIMIT_CHAR')

    if (
      icon_url &&
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
        icon_url,
      )
    )
      throw new Error('REGISTER_CATEGORY.INVALID_ICON_URL')

    if (!['in', 'out'].includes(transaction_type))
      throw new Error('REGISTER_CATEGORY.INVALID_TRANSACTION_TYPE')

    if (!user_id.startsWith('user-') || user_id.length !== 20)
      throw new Error('REGISTER_CATEGORY.INVALID_USER_ID')

    if (
      !categoryGroup.includes(group) ||
      (transaction_type === 'in' && group !== 'Income') ||
      (transaction_type === 'out' && group === 'Income')
    )
      throw new Error('REGISTER_CATEGORY.INVALID_GROUP')
  }
}

export default RegisterCategory
