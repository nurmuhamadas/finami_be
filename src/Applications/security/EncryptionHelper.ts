class EncryptionHelper {
  async hash(password: string): Promise<string> {
    throw new Error('ENCRYPTION_HELPER.METHOD_NOT_IMPLEMENTED')
  }

  async comparePassword(plain: string, encrypted: string): Promise<void> {
    throw new Error('ENCRYPTION_HELPER.METHOD_NOT_IMPLEMENTED')
  }
}

export default EncryptionHelper
