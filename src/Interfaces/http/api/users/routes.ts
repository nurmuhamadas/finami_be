import { ServerRoute } from '@hapi/hapi'
import UsersHandler from './handler'
import {
  postUserSchema,
  putUserSchema,
  getUserMembersSchema,
  postMemberSchema,
  putMemberSchema,
} from './schema'

const routes: (handler: UsersHandler) => ServerRoute[] = (
  handler: UsersHandler,
) => [
  {
    method: 'GET',
    path: '/users/members',
    handler: handler.getUsersHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        query: getUserMembersSchema,
      },
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
      payload: {
        allow: 'multipart/form-data',
        multipart: {
          output: 'stream',
        },
        maxBytes: 1024 * 1024 * 5,
      },
      validate: {
        payload: putUserSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/users/members',
    handler: handler.postUserMemberHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: postMemberSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/members/{id}',
    handler: handler.putUserMemberHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putMemberSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/members/{id}',
    handler: handler.deleteChildHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
