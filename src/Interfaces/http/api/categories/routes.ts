import { ServerRoute } from '@hapi/hapi'
import CategoriesHandlers from './handler'
import {
  getCategoriesSchema,
  postCategorySchema,
  putCategorySchema,
} from './schema'

const routes: (handler: CategoriesHandlers) => ServerRoute[] = (
  handler: CategoriesHandlers,
) => [
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategoriesHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        query: getCategoriesSchema,
      },
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
    path: '/categories',
    handler: handler.postCategoryHandler,
    options: {
      auth: 'finami_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: {
          output: 'stream',
        },
        maxBytes: 1024 * 1024 * 2,
      },
      validate: {
        payload: postCategorySchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putCategoryHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putCategorySchema,
      },
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
