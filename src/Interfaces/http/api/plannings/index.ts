import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import PlanningsHandlers from './handler'
const routes = require('./routes')

export default {
  name: 'plannings',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const planningsHandler = new PlanningsHandlers(container)
    server.route(routes(planningsHandler))
  },
}
