import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import CategoriesHandlers from './handler'
import routes from './routes'

export default {
  name: 'categories',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const categoriesHandler = new CategoriesHandlers(container)
    server.route(routes(categoriesHandler))
  },
}
