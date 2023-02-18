import IdGenerator from 'Applications/common/IdGenerator'
import CategoryRepository from 'Domains/categories/CategoryRepository'
import PlanningRepository from 'Domains/plannings/PlanningRepository'
import TransactionRepository from 'Domains/transactions/TransactionRepository'
import WalletRepository from 'Domains/wallets/WalletRepository'

export type PlanningsUseCaseType = {
  idGenerator: IdGenerator
  transactionRepository: TransactionRepository
  walletRepository: WalletRepository
  categoryRepository: CategoryRepository
  planningRepository: PlanningRepository
}

export type GetPlanningsPayload = {
  user_id: string
  child_id?: string
  wallet_id?: string
  month?: Date[]
}

export type GetPlanningByIdPayload = {
  id: string
  user_id: string
}

export type AddPlanningPayload = {
  name: string
  amount: number
  category_id: string
  wallet_id: string
  month: Date
  user_id: string
}

export type UpdatePlanningPayload = {
  id: string
  name: string
  amount: number
  category_id: string
  wallet_id: string
  user_id: string
}

export type DeletePlanningPayload = {
  id: string
  user_id: string
}
