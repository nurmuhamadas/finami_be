export type WalletsDataRepoType = {
  id: string
  name: string
  balance: string
  user_id: string
  user_name: string
  user_fullname: string
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
