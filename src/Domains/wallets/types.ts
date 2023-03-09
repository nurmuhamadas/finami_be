import { WalletDataType } from './entities/types'

export type GetWalletResult = WalletDataType & {
  user_name: string
  is_owner: boolean
}

export type GetWalletsResult = GetWalletResult[]
