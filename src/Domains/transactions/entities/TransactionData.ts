import { TransactionDataRepoType } from '../types'
import { TransactionDataRespType } from './types'

class TransactionData {
  values: TransactionDataRespType[]

  constructor(data: TransactionDataRepoType[], userId: string) {
    this.values = this._mapValues(data, userId)
  }

  _mapValues(
    data: TransactionDataRepoType[],
    userId: string,
  ): TransactionDataRespType[] {
    return data?.map((d) => {
      return {
        ...d,
        amount: Number(d.amount),
        is_owner: d.user_id === userId,
      }
    })
  }
}

export default TransactionData
