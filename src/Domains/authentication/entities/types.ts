import { UserDataType } from 'Domains/users/entities/types'

export type NewAuthenticationPayload = {
  accessToken: string
  refreshToken: string
  user: UserDataType
}

export type NewAuthenticationResult = {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    username: string
    email: string
    fullname: string
    parent_id: string
    image_url: string
  }
}
