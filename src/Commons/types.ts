export type TransactionTypesType = 'in' | 'out'

export type CategoryGroupsType =
  | 'Required Expense'
  | 'Irregular Expense'
  | 'Invensting and Debt Payment'
  | 'Fun and Relax'
  | 'Income'

export type OrderByType = 'asc' | 'desc'

export type IdGeneratorType = (prefix: string, length?: number) => string

export type DateFormatType =
  | 'yyyy/mm/dd'
  | 'dd/mm/yyyy'
  | 'mm/dd/yyyy'
  | 'yyyy/dd/mm'
  | 'yyyy-mm-dd'
  | 'dd-mm-yyyy'
  | 'mm-dd-yyyy'
  | 'yyyy-dd-mm'
