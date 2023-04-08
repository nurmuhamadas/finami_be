import { writeFile, rm } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import StorageServices from '../../Applications/storage/StorageManager'

class LocalStorageService extends StorageServices {
  private _path: string
  constructor({ path }: { path: string }) {
    super()
    this._path = path

    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true })
    }
  }

  async uploadImage(image: Buffer, filename: string): Promise<{ url: string }> {
    await writeFile(`${this._path}/${filename}`, image, { encoding: 'utf8' })

    return {
      url: `${this._path}/${filename}`,
    }
  }

  async deleteImage(fileName: string): Promise<boolean> {
    await rm(`${this._path}/${fileName}`)

    return true
  }
}

export default LocalStorageService
