import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import TransactionHandlers from './handler'
import routes from './routes'

export default {
  name: 'transactions',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const transactionsHandler = new TransactionHandlers(container)
    server.route(routes(transactionsHandler))
  },
}
