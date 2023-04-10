class ImageProcessor {
  async resizeImage({
    image,
    width,
    height,
  }: {
    image: Buffer
    width: number
    height: number
  }): Promise<Buffer> {
    throw new Error('IMAGE_PROCESSOR.METHOD_NOT_IMPLEMENTED')
  }
}

export default ImageProcessor
