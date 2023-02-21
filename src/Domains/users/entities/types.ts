export type UserLoginType = {
  username: string
  password: string
}

export type RegisterUserResult = {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  parent_id?: string | null
  image_url?: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type RegisterUserPayload = {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  parent_id?: string | null
  image_url?: string
}

export type UpdateDataUserResult = {
  username: string
  email: string
  password: string
  fullname: string
  image_url?: string
  updated_at: Date
}

export type UpdateDataUserPayload = {
  username: string
  email: string
  password: string
  fullname: string
  image_url?: string
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
  deleted_at: Date | null
}
