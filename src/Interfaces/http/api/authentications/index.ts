import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import AuthHandler from './handler'
const routes = require('./routes')

module.exports = {
  name: 'auth',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const authHandler = new AuthHandler(container)
    server.route(routes(authHandler))
  },
}
