import FilterTransaction from './entities/FilterTransaction'
import RegisterTransaction from './entities/RegisterTransaction'
import UpdateDataTransaction from './entities/UpdateDataTransaction'
import { TransactionDataRepoType } from './types'

class TransactionRepository {
  async addTransaction(
    registerTransaction: RegisterTransaction,
  ): Promise<TransactionDataRepoType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateTransaction(
    id: string,
    updateDataTransaction: UpdateDataTransaction,
  ): Promise<TransactionDataRepoType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteTransactionById(
    id: string,
  ): Promise<TransactionDataRepoType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreTransactionById(id: string): Promise<TransactionDataRepoType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionsByUserId(
    userId: string,
    filter?: FilterTransaction,
  ): Promise<TransactionDataRepoType[]> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionById(id: string): Promise<TransactionDataRepoType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyTransactionReadAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyTransactionWriteAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteTransactionsByWalletId(
    walletId: string,
  ): Promise<{ deletedRow: number }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default TransactionRepository
