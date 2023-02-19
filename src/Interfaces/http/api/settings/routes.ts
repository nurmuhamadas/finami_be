import CategoriesHandlers from './handler'

const routes = (handler: CategoriesHandlers) => [
  {
    method: 'GET',
    path: '/categories/',
    handler: handler.getSettingByUserIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    handler: handler.getSettingByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putSettingHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteSettingHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
