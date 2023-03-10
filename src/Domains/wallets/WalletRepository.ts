import RegisterWallet from './entities/RegisterWallet'
import UpdateDataWallet from './entities/UpdateDataWallet'
import { WalletsDataRepoType } from './types'

class WalletRepository {
  async addWallet(registerWallet: RegisterWallet): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateWallet(
    id: string,
    updateDataWallet: UpdateDataWallet,
  ): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteWalletById(id: string): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreWalletById(id: string): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyWalletOwner(id: string, userId: string): Promise<boolean> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getWalletsByUserId(userId: string): Promise<WalletsDataRepoType[]> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getWalletById(id: string): Promise<WalletsDataRepoType> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async increaseWalletBalance(
    walletId: string,
    amount: number,
  ): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async reduceWalletBalance(
    walletId: string,
    amount: number,
  ): Promise<{ id: string }> {
    throw new Error('WALLET_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default WalletRepository
