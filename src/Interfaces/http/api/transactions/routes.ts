import TransactionHandlers from './handler'

const routes = (handler: TransactionHandlers) => [
  {
    method: 'GET',
    path: '/transactions/',
    handler: handler.getTransactionsHandler,
    options: {
      auth: 'finami_jwt',
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
    path: '/transactions/{id}',
    handler: handler.postTransactionHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/transactions/{id}',
    handler: handler.putTransactionHandler,
    options: {
      auth: 'finami_jwt',
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
