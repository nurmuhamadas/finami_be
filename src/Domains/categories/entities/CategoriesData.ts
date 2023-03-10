import { GetUserRepoResult } from '../../../Domains/users/types'
import { CategoryDataRepoType } from '../types'
import { CategoryDataRespType } from './types'

class CategoriesData {
  values: CategoryDataRespType[]

  constructor(categories: CategoryDataRepoType[], user: GetUserRepoResult) {
    this.values = this._mapValues(categories, user)
  }

  _mapValues(
    data: CategoryDataRepoType[],
    user: GetUserRepoResult,
  ): CategoryDataRespType[] {
    return data?.map((d) => {
      return {
        id: d.id,
        name: d.name,
        icon_url: d.icon_url,
        group: d.group,
        transaction_type: d.transaction_type,
        user_id: d.user_id,
        user_name: user.username,
        user_fullname: user.fullname,
        is_owner: d.user_id === user.id,
        created_at: d.created_at,
        updated_at: d.updated_at,
        deleted_at: d.deleted_at,
      }
    })
  }
}

export default CategoriesData
