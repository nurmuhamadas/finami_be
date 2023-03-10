import { PlanningDataRepoType } from '../types'
import { PlanningDataRespType } from './types'

class PlanningData {
  values: PlanningDataRespType[]

  constructor(data: PlanningDataRepoType[], userId: string) {
    this.values = this._mapData(data, userId)
  }

  _mapData(
    data: PlanningDataRepoType[],
    userId: string,
  ): PlanningDataRespType[] {
    return data?.map((d) => {
      return {
        ...d,
        amount: Number(d.amount),
        is_owner: d.user_id === userId,
      }
    })
  }
}

export default PlanningData
