import ClientError from './ClientError'

class ConflictError extends ClientError {
  constructor(message: string) {
    super(message, 409)
    this.name = 'ConflictError'
  }
}

export default ConflictError
