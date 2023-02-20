import SettingHandlers from './handler'

const routes = (handler: SettingHandlers) => [
  {
    method: 'GET',
    path: '/setting',
    handler: handler.getSettingByUserIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'GET',
    path: '/setting/{id}',
    handler: handler.getSettingByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/setting/{id}',
    handler: handler.putSettingHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/setting/{id}',
    handler: handler.deleteSettingHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
