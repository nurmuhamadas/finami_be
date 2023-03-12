import { TransactionTypesType } from '../../Commons/types'

type calcTransactionType = {
  type: TransactionTypesType
  amount: number
}
export const calculateDiffTransactionAmount = (
  newTransaction: calcTransactionType,
  lastTransaction: calcTransactionType,
) => {
  let _newTrx =
    (newTransaction.amount || 0) * (newTransaction.type === 'in' ? 1 : -1)
  let _lastTrx =
    (lastTransaction.amount || 0) * (lastTransaction.type === 'in' ? 1 : -1)

  return _newTrx - _lastTrx
}
