import {
  RegisterWalletType,
  UpdateDataWalletType,
  WalletDataType,
} from './entities/types'

class WalletRepository {
  async addWallet(registerWallet: RegisterWalletType): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateWallet(
    id: string,
    updateDataWallet: UpdateDataWalletType,
  ): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteWalletById(id: string): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getWalletsByUserId(userId: string): Promise<WalletDataType[]> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getWalletById(id: string): Promise<WalletDataType> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default WalletRepository
