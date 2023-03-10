import UserRepository from '../../../Domains/users/UserRepository'
import IdGenerator from '../../../Applications/common/IdGenerator'
import WalletRepository from '../../../Domains/wallets/WalletRepository'
import TransactionRepository from '../../../Domains/transactions/TransactionRepository'

export type WalletUseCaseType = {
  idGenerator: IdGenerator
  walletRepository: WalletRepository
  userRepository: UserRepository
  transactionRepository: TransactionRepository
}

export type GetWalletsPayload = {
  user_id: string
}

export type GetWalletByIdPayload = {
  user_id: string
  wallet_id: string
}

export type AddWalletPayload = {
  name: string
  balance: number
  userId: string
  walletOwner: string // user_id from payload
}

export type UpdateWalletPayload = {
  name: string
  balance: number
  userId: string
  walletId: string
}

export type DeleteWalletPayload = {
  walletId: string
  userId: string
}

export type RestoreWalletPayload = {
  walletId: string
  userId: string
}
