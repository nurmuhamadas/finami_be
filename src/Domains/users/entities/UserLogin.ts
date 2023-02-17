import { UserLoginType } from './types'

class UserLogin {
  values: UserLoginType

  constructor(payload: UserLoginType) {
    this.values = payload
  }
}

export default UserLogin
