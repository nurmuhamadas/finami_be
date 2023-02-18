import WalletRepository from 'Domains/wallets/WalletRepository'
import {
  WalletUseCaseType,
  GetWalletsPayload,
  AddWalletPayload,
  UpdateWalletPayload,
  DeleteWalletPayload,
  RestoreWalletPayload,
} from './types'
import { GetWalletResult, GetWalletsResult } from 'Domains/wallets/types'
import RegisterWallet from 'Domains/wallets/entities/RegisterWallet'
import { IdGeneratorType } from 'Commons/types'
import UpdateDataWallet from 'Domains/wallets/entities/UpdateDataWallet'

class WalletsUseCase {
  _walletRepository: WalletRepository
  _idGenerator: IdGeneratorType

  constructor({ walletRepository, idGenerator }: WalletUseCaseType) {
    this._walletRepository = walletRepository
    this._idGenerator = idGenerator
  }

  async getWallets({
    userId,
    walletId,
  }: GetWalletsPayload): Promise<GetWalletResult | GetWalletsResult> {
    let result: GetWalletResult | GetWalletsResult

    if (walletId) {
      result = await this._walletRepository.getWalletById(walletId)
    } else {
      result = await this._walletRepository.getWalletsByUserId(userId)
    }

    return result
  }

  async addWallet({
    name,
    balance,
    userId,
  }: AddWalletPayload): Promise<{ id: string }> {
    const registerWallet = new RegisterWallet({
      id: this._idGenerator('wallet'),
      name,
      balance,
      user_id: userId,
    })

    const result = await this._walletRepository.addWallet(registerWallet)
    return result
  }

  async updateWallet({
    name,
    balance,
    userId,
    walletId,
  }: UpdateWalletPayload): Promise<{ id: string }> {
    const updateDataWallet = new UpdateDataWallet({
      name,
      balance,
    })

    await this._walletRepository.verifyWalletOwner(walletId, userId)

    const result = await this._walletRepository.updateWallet(
      walletId,
      updateDataWallet,
    )
    return result
  }

  async deleteWallet({
    walletId,
    userId,
  }: DeleteWalletPayload): Promise<{ id: string }> {
    await this._walletRepository.verifyWalletOwner(walletId, userId)
    const result = await this._walletRepository.softDeleteWalletById(walletId)
    return result
  }

  async restoreWallet({
    walletId,
    userId,
  }: RestoreWalletPayload): Promise<{ id: string }> {
    await this._walletRepository.verifyWalletOwner(walletId, userId)
    const result = await this._walletRepository.restoreWalletById(walletId)
    return result
  }
}

export default WalletsUseCase
