import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import AuthHandler from './handler'
import routes from './routes'

export default {
  name: 'auth',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const authHandler = new AuthHandler(container)
    server.route(routes(authHandler))
  },
}
