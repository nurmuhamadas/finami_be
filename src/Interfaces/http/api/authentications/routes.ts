import AuthHandler from './handler'
import {
  deleteAuthenticationSchema,
  postAuthenticationSchema,
  putAuthenticationSchema,
} from './schema'

const routes = (handler: AuthHandler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      validate: {
        payload: postAuthenticationSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      validate: {
        payload: putAuthenticationSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      validate: {
        payload: deleteAuthenticationSchema,
      },
    },
  },
]

export default routes
