import { IdGeneratorType } from 'Commons/types'
import WalletRepository from 'Domains/wallets/WalletRepository'

export type WalletUseCaseType = {
  idGenerator: IdGeneratorType
  walletRepository: WalletRepository
}

export type GetWalletsPayload = {
  userId: string
  walletId?: string
}

export type AddWalletPayload = {
  name: string
  balance: number
  userId: string
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
