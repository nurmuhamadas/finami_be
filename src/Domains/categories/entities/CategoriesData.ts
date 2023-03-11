import { CategoryDataRepoType } from '../types'
import { CategoryDataRespType } from './types'

class CategoriesData {
  values: CategoryDataRespType[]

  constructor(categories: CategoryDataRepoType[], userId: string) {
    this.values = this._mapValues(categories, userId)
  }

  _mapValues(
    data: CategoryDataRepoType[],
    userId: string,
  ): CategoryDataRespType[] {
    return data?.map((d) => {
      return {
        ...d,
        is_owner: d.user_id === userId,
      }
    })
  }
}

export default CategoriesData
