import UsersHandler from './handler'

const routes = (handler: UsersHandler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserHandler,
    options: {
      auth: 'finami_jwt',
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
