import WalletsHandler from './handler'

const routes = (handler: WalletsHandler) => [
  {
    method: 'GET',
    path: '/wallets/',
    handler: handler.getWAlletsHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'GET',
    path: '/wallets/{id}',
    handler: handler.getWAlletByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'POST',
    path: '/wallets/{id}',
    handler: handler.postWalletHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/wallets/{id}',
    handler: handler.putWalletHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/wallets/{id}',
    handler: handler.deleteWalletHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
