export type RegisterWalletType = {
  id: string
  name: string
  user_id: string
  balance: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type UpdateDataWalletType = {
  name: string
  user_id: string
  balance: number
  updated_at: Date
}

export type WalletDataType = {
  id: string
  name: string
  user_id: string
  balance: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
