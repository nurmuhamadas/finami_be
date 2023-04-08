class StorageServices {
  async uploadImage(
    image: Buffer,
    filename: string,
  ): Promise<{
    url: string
  }> {
    throw new Error('STORAGE_SERVICES.METHOD_NOT_IMPLEMENTED')
  }

  async deleteImage(fileName: string): Promise<boolean> {
    throw new Error('STORAGE_SERVICES.METHOD_NOT_IMPLEMENTED')
  }
}

export default StorageServices
