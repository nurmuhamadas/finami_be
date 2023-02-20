import CategoriesHandlers from './handler'

const routes = (handler: CategoriesHandlers) => [
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategoriesHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    handler: handler.getCategoryByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'POST',
    path: '/categories/{id}',
    handler: handler.postCategoryHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putCategoryHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteCategoryHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
