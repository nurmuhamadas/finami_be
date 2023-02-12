import { server as HapiServer } from '@hapi/hapi'
import { config } from 'dotenv'

config()

const init = async () => {
  const server = HapiServer({
    port: 3000,
    host: 'localhost',
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
