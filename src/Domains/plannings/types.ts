import { PlanningDataType } from './entities/types'

export type GetPlanningResult = PlanningDataType & {
  user_name: string
  category_name: string
  wallet_name: string
  is_owner: boolean
}

export type GetPlanningsResult = GetPlanningResult[]
