import { config } from 'dotenv'
import createServer from './Infrastructures/http/createServer'
import containerInstance from './Infrastructures/container'

config()

const init = async () => {
  const server = await createServer(containerInstance)
  await server.start()
  console.log(`server start at ${server.info.uri}`)
}

init()
