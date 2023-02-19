import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import WalletsHandler from './handler'
const routes = require('./routes')

module.exports = {
  name: 'wallets',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const walletsHandler = new WalletsHandler(container)
    server.route(routes(walletsHandler))
  },
}
