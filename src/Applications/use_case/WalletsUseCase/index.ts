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
import RegisterWallet from '../../../Domains/wallets/entities/RegisterWallet'
import UpdateDataWallet from '../../../Domains/wallets/entities/UpdateDataWallet'
import IdGenerator from '../../../Applications/common/IdGenerator'
import UserRepository from '../../../Domains/users/UserRepository'
import TransactionRepository from '../../../Domains/transactions/TransactionRepository'
import { WalletsDataRespType } from '../../../Domains/wallets/entities/types'
import CategoriesData from '../../../Domains/categories/entities/CategoriesData'
import WalletsData from '../../../Domains/wallets/entities/WalletsData'

class WalletsUseCase {
  _walletRepository: WalletRepository
  _userRepository: UserRepository
  _transactionRepository: TransactionRepository
  _idGenerator: IdGenerator

  constructor({
    walletRepository,
    idGenerator,
    userRepository,
    transactionRepository,
  }: WalletUseCaseType) {
    this._walletRepository = walletRepository
    this._userRepository = userRepository
    this._transactionRepository = transactionRepository
    this._idGenerator = idGenerator
  }

  async getWallets({
    user_id,
  }: GetWalletsPayload): Promise<WalletsDataRespType[]> {
    const result = await this._walletRepository.getWalletsByUserId(user_id)
    const data = new WalletsData(result, user_id)
    return data.values
  }

  async getWalletById({
    user_id,
    wallet_id,
  }: GetWalletByIdPayload): Promise<WalletsDataRespType> {
    // verify access
    await this._walletRepository.verifyWalletOwner(wallet_id, user_id)

    const result = await this._walletRepository.getWalletById(wallet_id)
    return {
      ...result,
      balance: Number(result.balance),
    }
  }

  async addWallet({
    name,
    balance,
    userId,
    walletOwner,
  }: AddWalletPayload): Promise<{ id: string }> {
    const registerWallet = new RegisterWallet({
      id: this._idGenerator.generate('wallet'),
      name,
      balance,
      user_id: walletOwner,
    })

    await this._userRepository.verifyUserAccess(walletOwner, userId)
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
    await this._transactionRepository.softDeleteTransactionsByWalletId(walletId)
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
