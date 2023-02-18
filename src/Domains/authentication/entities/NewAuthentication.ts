import { NewAuthenticationResult, NewAuthenticationPayload } from './types'

class NewAuthentication {
  values: NewAuthenticationResult

  constructor(payload: NewAuthenticationPayload) {
    this.values = payload
  }
}

export default NewAuthentication
