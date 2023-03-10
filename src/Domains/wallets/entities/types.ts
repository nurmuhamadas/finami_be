export type RegisterWalletPayload = {
  id: string
  name: string
  user_id: string
  balance: number
}

export type RegisterWalletResult = {
  id: string
  name: string
  user_id: string
  balance: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type UpdateDataWalletPayload = {
  name?: string
  balance?: number
}

export type UpdateDataWalletResult = {
  name?: string
  balance?: number
  updated_at: Date
}

export type WalletsDataRespType = {
  id: string
  name: string
  user_id: string
  user_name: string
  user_fullname: string
  balance: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
