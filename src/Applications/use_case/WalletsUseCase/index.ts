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
import WalletsData from '../../../Domains/wallets/entities/WalletsData'
import PlanningRepository from 'Domains/plannings/PlanningRepository'

class WalletsUseCase {
  _walletRepository: WalletRepository
  _userRepository: UserRepository
  _transactionRepository: TransactionRepository
  _planningRepository: PlanningRepository
  _idGenerator: IdGenerator

  constructor({
    walletRepository,
    idGenerator,
    userRepository,
    transactionRepository,
    planningRepository,
  }: WalletUseCaseType) {
    this._walletRepository = walletRepository
    this._userRepository = userRepository
    this._transactionRepository = transactionRepository
    this._planningRepository = planningRepository
    this._idGenerator = idGenerator
  }

  async getWallets({
    user_id,
    user_id_query,
  }: GetWalletsPayload): Promise<WalletsDataRespType[]> {
    let result
    if (!!user_id_query) {
      result = await this._walletRepository.getWalletsByUserId(user_id_query)
    } else {
      result = await this._walletRepository.getAllWallets(user_id)
    }
    const data = new WalletsData(result, user_id)
    return data.values
  }

  async getWalletById({
    user_id,
    wallet_id,
  }: GetWalletByIdPayload): Promise<WalletsDataRespType> {
    // verify access
    await this._walletRepository.verifyWalletReadAccess(wallet_id, user_id)

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
  }: AddWalletPayload): Promise<{ id: string }> {
    const registerWallet = new RegisterWallet({
      id: this._idGenerator.generate('wallet'),
      name,
      balance,
      user_id: userId,
    })

    await this._walletRepository.verifyAvailableWalletName(
      userId,
      registerWallet.values.name,
    )

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
    await this._walletRepository.verifyWalletWriteAccess(walletId, userId)
    await this._walletRepository.verifyAvailableWalletName(
      userId,
      updateDataWallet.values.name,
    )

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
    await this._walletRepository.verifyWalletWriteAccess(walletId, userId)
    const result = await this._walletRepository.softDeleteWalletById(walletId)

    await this._transactionRepository.softDeleteTransactionsByWalletId(walletId)

    await this._planningRepository.softDeletePlanningByWalletId(walletId)
    return result
  }

  async restoreWallet({
    walletId,
    userId,
  }: RestoreWalletPayload): Promise<{ id: string }> {
    // verify access
    await this._walletRepository.verifyWalletWriteAccess(walletId, userId)

    const result = await this._walletRepository.restoreWalletById(walletId)
    return result
  }
}

export default WalletsUseCase
