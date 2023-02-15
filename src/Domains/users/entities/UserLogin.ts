import { UserLoginType } from './types'

class UserLogin {
  result: UserLoginType

  constructor(payload: UserLoginType) {
    this.result = payload
  }
}

export default UserLogin
