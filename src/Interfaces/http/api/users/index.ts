import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import UsersHandler from './handler'
import routes from './routes'

export default {
  name: 'users',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const usersHandler = new UsersHandler(container)
    server.route(routes(usersHandler))
  },
}
