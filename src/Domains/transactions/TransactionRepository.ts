import FilterTransaction from './entities/FilterTransaction'
import RegisterTransaction from './entities/RegisterTransaction'
import UpdateDataTransaction from './entities/UpdateDataTransaction'
import { TransactionDataType } from './entities/types'

class TransactionRepository {
  async addTransaction(
    registerTransaction: RegisterTransaction,
  ): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateTransaction(
    id: string,
    updateDataTransaction: UpdateDataTransaction,
  ): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteTransactionById(id: string): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restoreTransactionById(id: string): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionsByUserId(
    userId: string,
    filter?: FilterTransaction,
  ): Promise<TransactionDataType[]> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionById(id: string): Promise<TransactionDataType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default TransactionRepository
