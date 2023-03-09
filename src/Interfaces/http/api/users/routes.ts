import UsersHandler from './handler'
import { postUserSchema, putUserSchema } from './schema'

const routes = (handler: UsersHandler) => [
  {
    method: 'GET',
    path: '/users/members',
    handler: handler.getUsersHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      validate: {
        payload: postUserSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putUserSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteChildHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
