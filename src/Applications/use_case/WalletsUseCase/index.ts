import WalletRepository from '../../../Domains/wallets/WalletRepository'
import {
  WalletUseCaseType,
  GetWalletsPayload,
  AddWalletPayload,
  UpdateWalletPayload,
  DeleteWalletPayload,
  RestoreWalletPayload,
  GetWalletByIdPayload,
} from './types'
import {
  GetWalletResult,
  GetWalletsResult,
} from '../../../Domains/wallets/types'
import RegisterWallet from '../../../Domains/wallets/entities/RegisterWallet'
import UpdateDataWallet from '../../../Domains/wallets/entities/UpdateDataWallet'
import IdGenerator from '../../../Applications/common/IdGenerator'

class WalletsUseCase {
  _walletRepository: WalletRepository
  _idGenerator: IdGenerator

  constructor({ walletRepository, idGenerator }: WalletUseCaseType) {
    this._walletRepository = walletRepository
    this._idGenerator = idGenerator
  }

  async getWallets({ user_id }: GetWalletsPayload): Promise<GetWalletsResult> {
    const result = await this._walletRepository.getWalletsByUserId(user_id)
    return result
  }

  async getWalletById({
    user_id,
    wallet_id,
  }: GetWalletByIdPayload): Promise<GetWalletResult> {
    // verify access
    await this._walletRepository.verifyWalletOwner(wallet_id, user_id)

    const result = await this._walletRepository.getWalletById(wallet_id)
    return result
  }

  async addWallet({
    name,
    balance,
    userId,
  }: AddWalletPayload): Promise<{ id: string }> {
    const registerWallet = new RegisterWallet({
      id: this._idGenerator.generate('wallet'),
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

    // verify access
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
    // verify access
    await this._walletRepository.verifyWalletOwner(walletId, userId)

    const result = await this._walletRepository.restoreWalletById(walletId)
    return result
  }
}

export default WalletsUseCase
