import { Sharp } from 'sharp'
import ImageProcessor from '../../Applications/storage/ImageProcessor'

class SharpImageProcessor extends ImageProcessor {
  private _sharp: { default: (image: Buffer) => Sharp }

  constructor(sharp: { default: (image: Buffer) => Sharp }) {
    super()
    this._sharp = sharp
  }

  async resizeImage({
    image,
    width,
    height,
  }: {
    image: Buffer
    width: number
    height: number
  }): Promise<Buffer> {
    return await this._sharp
      .default(image)
      .resize({ width, height, fit: 'cover' })
      .toBuffer()
  }
}

export default SharpImageProcessor
