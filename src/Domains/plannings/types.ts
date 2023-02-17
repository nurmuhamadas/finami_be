import { PlanningDataType } from './entities/types'

export type GetPlanningResult = PlanningDataType & {
  user_name: string
}

export type GetPlanningsResult = GetPlanningResult[]
