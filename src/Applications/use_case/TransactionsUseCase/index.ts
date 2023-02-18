import {
  AddTransactionPayload,
  DeleteTransactionPayload,
  GetTransactionPayload,
  TransactionsUseCaseType,
  UpdateTransactionPayload,
} from './types'
import { IdGeneratorType } from 'Commons/types'
import { calculateDiffTransactionAmount } from 'Commons/utils/helpers'
import CategoryRepository from 'Domains/categories/CategoryRepository'
import TransactionRepository from 'Domains/transactions/TransactionRepository'
import FilterTransaction from 'Domains/transactions/entities/FilterTransaction'
import RegisterTransaction from 'Domains/transactions/entities/RegisterTransaction'
import UpdateDataTransaction from 'Domains/transactions/entities/UpdateDataTransaction'
import { GetTransactionsResult } from 'Domains/transactions/types'
import WalletRepository from 'Domains/wallets/WalletRepository'

class TransactionsUseCase {
  _transactionRepository: TransactionRepository
  _walletRepository: WalletRepository
  _categoryRepository: CategoryRepository
  _idGenerator: IdGeneratorType

  constructor({
    transactionRepository,
    walletRepository,
    categoryRepository,
    idGenerator,
  }: TransactionsUseCaseType) {
    this._transactionRepository = transactionRepository
    this._walletRepository = walletRepository
    this._categoryRepository = categoryRepository
    this._idGenerator = idGenerator
  }

  async getTranscations({
    user_id,
    child_id,
    transaction_type,
    date_range,
    category_id,
    wallet_id,
    search_key,
    limit,
    offset,
    sort_by,
    order_by,
  }: GetTransactionPayload): Promise<GetTransactionsResult> {
    const filter = new FilterTransaction({
      transaction_type,
      date_range,
      category_id,
      wallet_id,
      search_key,
      limit,
      offset,
      sort_by,
      order_by,
    })
    const result = await this._transactionRepository.getTransactionsByUserId(
      child_id || user_id,
      filter,
    )

    return result
  }

  async addTransaction({
    user_id,
    amount,
    description,
    category_id,
    wallet_id,
    transaction_type,
    date,
    image_url,
  }: AddTransactionPayload): Promise<{ id: string }> {
    const registerTransaction = new RegisterTransaction({
      id: this._idGenerator('trx'),
      amount,
      description,
      category_id,
      wallet_id,
      transaction_type,
      date,
      image_url,
      user_id,
    })

    // verify access
    await this._walletRepository.verifyWalletOwner(wallet_id, user_id)
    await this._categoryRepository.verifyCategoryOwner(category_id, user_id)

    const result = await this._transactionRepository.addTransaction(
      registerTransaction,
    )

    // Update wallet balance by transaction
    if (transaction_type === 'in') {
      await this._walletRepository.increaseWalletBalance(wallet_id, amount)
    } else {
      await this._walletRepository.reduceWalletBalance(wallet_id, amount)
    }

    return result
  }

  async updateTransaction({
    id,
    user_id,
    amount,
    description,
    category_id,
    wallet_id,
    transaction_type,
    date,
    image_url,
  }: UpdateTransactionPayload): Promise<{ id: string }> {
    const updateDataTransaction = new UpdateDataTransaction({
      amount,
      description,
      category_id,
      transaction_type,
      date,
      image_url,
    })

    // verify access
    await this._transactionRepository.verifyTransactionOwner(id, user_id)
    await this._categoryRepository.verifyCategoryOwner(category_id, user_id)

    const lastTransaction =
      await this._transactionRepository.getTransactionById(id)
    const result = await this._transactionRepository.updateTransaction(
      id,
      updateDataTransaction,
    )

    // Update wallet balance by transaction
    const diffAmount = calculateDiffTransactionAmount(
      { amount, type: transaction_type },
      {
        amount: lastTransaction.amount,
        type: lastTransaction.transaction_type,
      },
    )
    if (transaction_type === 'in') {
    }
    if (diffAmount > 0) {
      await this._walletRepository.increaseWalletBalance(wallet_id, amount)
    } else {
      await this._walletRepository.reduceWalletBalance(wallet_id, amount)
    }

    return result
  }

  async deleteTransaction({
    id,
    user_id,
  }: DeleteTransactionPayload): Promise<{ id: string }> {
    // verify access
    await this._transactionRepository.verifyTransactionOwner(id, user_id)

    const result = await this._transactionRepository.softDeleteTransactionById(
      id,
    )

    // Update wallet balance by transaction
    if (result.transaction_type === 'in') {
      await this._walletRepository.reduceWalletBalance(
        result.wallet_id,
        result.amount,
      )
    } else {
      await this._walletRepository.increaseWalletBalance(
        result.wallet_id,
        result.amount,
      )
    }

    return result
  }

  async restoreTransaction({
    id,
    user_id,
  }: DeleteTransactionPayload): Promise<{ id: string }> {
    // verify access
    await this._transactionRepository.verifyTransactionOwner(id, user_id)

    const result = await this._transactionRepository.restoreTransactionById(id)

    // Update wallet balance by transaction
    if (result.transaction_type === 'in') {
      await this._walletRepository.increaseWalletBalance(
        result.wallet_id,
        result.amount,
      )
    } else {
      await this._walletRepository.reduceWalletBalance(
        result.wallet_id,
        result.amount,
      )
    }

    return result
  }
}

export default TransactionsUseCase
