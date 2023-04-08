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
    await writeFile(`${this._path}/images/${filename}`, image, {
      encoding: 'utf8',
    })

    return {
      url: `${this._path}/${filename}`,
    }
  }

  async deleteImage(relativePath: string): Promise<boolean> {
    await rm(`${this._path}/${relativePath}`)

    return true
  }

  async imagePathGenerator(
    _fileName: string,
  ): Promise<{ fileName: string; path: string }> {
    const fileName = `${+new Date()}-${_fileName
      ?.replaceAll(' ', '_')
      ?.toLowerCase()}`
    const path = `images/${fileName}`

    return {
      fileName,
      path,
    }
  }
}

export default LocalStorageService
