export type UserLoginType = {
  username: string
  password: string
}

export type RegisterUserType = {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  parent_id?: string
  image_url?: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

export type UpdateDataUserType = {
  username: string
  email: string
  password: string
  fullname: string
  parent_id?: string
  image_url?: string
  updated_at: Date
}

export type UserDataType = {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  parent_id: string
  image_url: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
