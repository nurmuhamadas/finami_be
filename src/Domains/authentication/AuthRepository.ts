class AuthRepository {
  async addToken(token: string): Promise<void> {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async checkAvailabilityToken(token: string): Promise<boolean> {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async deleteToken(token: string): Promise<void> {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default AuthRepository
