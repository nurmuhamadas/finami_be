import { Server } from '@hapi/hapi'

import routes from './routes'

export default {
  name: 'static',
  register: async (server: Server) => {
    server.route(routes())
  },
}
