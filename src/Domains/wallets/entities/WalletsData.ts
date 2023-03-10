import { WalletsDataRespType } from './types'
import { WalletsDataRepoType } from '../types'

class WalletsData {
  values: WalletsDataRespType[]

  constructor(payload: WalletsDataRepoType[], userId: string) {
    this.values = this._mapData(payload, userId)
  }

  _mapData(
    data: WalletsDataRepoType[] = [],
    userId: string,
  ): WalletsDataRespType[] {
    return data?.map((d) => {
      return {
        ...d,
        balance: Number(d.balance),
        is_owner: d.user_id === userId,
      }
    })
  }
}

export default WalletsData
