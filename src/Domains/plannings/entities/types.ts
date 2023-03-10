export type RegisterPlanningResult = {
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

export type RegisterPlanningPayload = {
  id: string
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
  month: Date
}

export type UpdateDataPlanningResult = {
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
  updated_at: Date
}

export type UpdateDataPlanningPayload = {
  name: string
  amount: number
  category_id: string
  user_id: string
  wallet_id: string
}

export type PlanningFilter = {
  wallet_id?: string
  month?: Date[]
  category_id?: string
  search_key?: string
}

export type PlanningDataRespType = {
  id: string
  name: string
  amount: number
  category_id: string
  category_name: string
  user_id: string
  user_name: string
  user_fullname: string
  wallet_id: string
  wallet_name: string
  month: Date
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
