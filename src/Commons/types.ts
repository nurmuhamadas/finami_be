export type TransactionTypesType = 'in' | 'out'

export type CategoryGroupsType =
  | 'Required Expense'
  | 'Irregular Expense'
  | 'Invensting and Debt Payment'
  | 'Fun and Relax'
  | 'Income'

export type IdGeneratorType = (prefix: string, length?: number) => string
