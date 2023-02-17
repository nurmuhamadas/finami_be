import { WalletDataType } from './entities/types'

export type GetWalletResult = WalletDataType & {
  user_name: string
}

export type GetWalletsResult = GetWalletResult[]
