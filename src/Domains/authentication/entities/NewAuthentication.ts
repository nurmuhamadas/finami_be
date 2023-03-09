import { NewAuthenticationResult, NewAuthenticationPayload } from './types'

class NewAuthentication {
  values: NewAuthenticationResult

  constructor(payload: NewAuthenticationPayload) {
    this.values = {
      ...payload,
      user: {
        id: payload.user?.id,
        email: payload.user?.email,
        username: payload.user?.username,
        fullname: payload.user?.fullname,
        image_url: payload.user?.image_url,
        parent_id: payload.user?.parent_id,
      },
    }
  }
}

export default NewAuthentication
