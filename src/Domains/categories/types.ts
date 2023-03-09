import { CategoryGroupsType, TransactionTypesType } from 'Commons/types'

export type CategoryDataRepoType = {
  id: string
  name: string
  icon_url: string
  transaction_type: TransactionTypesType
  group: CategoryGroupsType
  user_id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}
