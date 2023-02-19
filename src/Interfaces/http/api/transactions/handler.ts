import { Request } from '@hapi/hapi'
import containerInstance from '../../../../Infrastructures/container'
import autoBind from 'auto-bind'
import TransactionsUseCase from 'Applications/use_case/TransactionsUseCase'

class TransactionHandlers {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async getTransactionsHandler(request: Request, h: any) {
    const transactionsUseCase: TransactionsUseCase =
      this._container.getInstance(TransactionsUseCase.name)

    const { id: userId } = request.auth.credentials
    const {
      child_id,
      transaction_type,
      date_range,
      category_id,
      search_key,
      wallet_id,
      limit,
      offset,
      order_by,
      sort_by,
    } = request.payload as any
    const data = await transactionsUseCase.getTranscations({
      user_id: userId as string,
      child_id,
      transaction_type,
      date_range,
      category_id,
      search_key,
      wallet_id,
      limit,
      offset,
      order_by,
      sort_by,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async getTransactionByIdHandler(request: Request, h: any) {
    const transactionsUseCase: TransactionsUseCase =
      this._container.getInstance(TransactionsUseCase.name)

    const { id: userId } = request.auth.credentials
    const { id } = request.params as any

    const data = await transactionsUseCase.getTransactionById({
      id,
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async postTransactionHandler(request: Request, h: any) {
    const transactionUseCase: TransactionsUseCase = this._container.getInstance(
      TransactionsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const {
      amount,
      description,
      date,
      transaction_type,
      image_url,
      category_id,
      wallet_id,
    } = request.payload as any

    const data = await transactionUseCase.addTransaction({
      user_id: userId as string,
      amount,
      description,
      date,
      transaction_type,
      image_url,
      category_id,
      wallet_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(201)
    return response
  }

  async putTransactionHandler(request: Request, h: any) {
    const transactionUseCase: TransactionsUseCase = this._container.getInstance(
      TransactionsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params
    const {
      amount,
      description,
      date,
      transaction_type,
      image_url,
      category_id,
      wallet_id,
    } = request.payload as any

    const data = await transactionUseCase.updateTransaction({
      id,
      user_id: userId as string,
      amount,
      description,
      date,
      transaction_type,
      image_url,
      category_id,
      wallet_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async deleteTransactionHandler(request: Request, h: any) {
    const transactionUseCase: TransactionsUseCase = this._container.getInstance(
      TransactionsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params

    const data = await transactionUseCase.deleteTransaction({
      id,
      user_id: userId as string,
    })

    return {
      status: 'success',
      data,
    }
  }
}

export default TransactionHandlers
