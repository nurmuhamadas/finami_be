import PlanningsHandlers from './handler'

const routes = (handler: PlanningsHandlers) => [
  {
    method: 'GET',
    path: '/plannings/',
    handler: handler.getPlanningsHandler,
    options: {
      auth: 'finami_jwt',
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
    path: '/plannings/{id}',
    handler: handler.postPlanningHandler,
    options: {
      auth: 'finami_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/plannings/{id}',
    handler: handler.putPlanningHandler,
    options: {
      auth: 'finami_jwt',
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
