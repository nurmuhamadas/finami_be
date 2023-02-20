import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import WalletsHandler from './handler'
import routes from './routes'

export default {
  name: 'wallets',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const walletsHandler = new WalletsHandler(container)
    server.route(routes(walletsHandler))
  },
}
