import PlanningsHandlers from './handler'
import {
  getPlanningsSchema,
  postPlanningSchema,
  putPlanningSchema,
} from './schema'

const routes = (handler: PlanningsHandlers) => [
  {
    method: 'GET',
    path: '/plannings',
    handler: handler.getPlanningsHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        query: getPlanningsSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/plannings/{id}',
    handler: handler.getPlanningByIdHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'POST',
    path: '/plannings',
    handler: handler.postPlanningHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: postPlanningSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/plannings/{id}',
    handler: handler.putPlanningHandler,
    options: {
      auth: 'finami_jwt',
      validate: {
        payload: putPlanningSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/plannings/{id}',
    handler: handler.deletePlanningHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
]

export default routes
