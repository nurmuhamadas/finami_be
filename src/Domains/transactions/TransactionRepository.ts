import {
  RegisterTransactionType,
  TransactionDataType,
  TransactionFilter,
  UpdateDataTransactionType,
} from './entities/types'

class TransactionRepository {
  async addTransaction(
    registerTransaction: RegisterTransactionType,
  ): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updateTransaction(
    id: string,
    updateDataTransaction: UpdateDataTransactionType,
  ): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeleteTransactionById(id: string): Promise<{ id: string }> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionsByUserId(
    userId: string,
    filter?: TransactionFilter,
  ): Promise<TransactionDataType[]> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getTransactionById(id: string): Promise<TransactionDataType> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default TransactionRepository
