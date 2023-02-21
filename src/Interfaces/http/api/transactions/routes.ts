import TransactionHandlers from './handler'
import {
  getTransactionSchema,
  postTransactionSchema,
  putTransactionSchema,
} from './schema'

const routes = (handler: TransactionHandlers) => [
  {
    method: 'GET',
    path: '/transactions',
    handler: handler.getTransactionsHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        query: getTransactionSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/transactions/{id}',
    handler: handler.getTransactionByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'POST',
    path: '/transactions',
    handler: handler.postTransactionHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: postTransactionSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/transactions/{id}',
    handler: handler.putTransactionHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putTransactionSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/transactions/{id}',
    handler: handler.deleteTransactionHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
