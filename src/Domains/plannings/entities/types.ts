export type RegisterPlanningType = {
  id: string
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
  month: Date
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type UpdateDataPlanningType = {
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
  updated_at: Date
}

export type PlanningFilter = {
  wallet_id?: string
  month?: Date[]
}

export type PlanningDataType = {
  id: string
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
  month: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
