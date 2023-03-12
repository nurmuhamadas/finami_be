import WalletsHandler from './handler'
import { getWalletsSchema, postWalletSchema, putWalletSchema } from './schema'

const routes = (handler: WalletsHandler) => [
  {
    method: 'GET',
    path: '/wallets',
    handler: handler.getWAlletsHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        query: getWalletsSchema,
      },
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
    path: '/wallets',
    handler: handler.postWalletHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: postWalletSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/wallets/{id}',
    handler: handler.putWalletHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putWalletSchema,
      },
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
