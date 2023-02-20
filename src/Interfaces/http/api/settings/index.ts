import { Server } from '@hapi/hapi'

import containerInstance from '../../../../Infrastructures/container'
import SettingsHandlers from './handler'
import routes from './routes'

export default {
  name: 'settings',
  register: async (
    server: Server,
    { container }: { container: typeof containerInstance },
  ) => {
    const settingsHandler = new SettingsHandlers(container)
    server.route(routes(settingsHandler))
  },
}
