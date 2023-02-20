import { server as HapiServer } from '@hapi/hapi'
import containerInstance from '../container'

import * as Jwt from '@hapi/jwt'
import users from '../../Interfaces/http/api/users'
import authentications from '../../Interfaces/http/api/authentications'
import categories from '../../Interfaces/http/api/categories'
import plannings from '../../Interfaces/http/api/plannings'
import settings from '../../Interfaces/http/api/settings'
import transactions from '../../Interfaces/http/api/transactions'
import wallets from '../../Interfaces/http/api/wallets'
import DomainErrorTranslator from '../../Commons/exceptions/DomainErrorTranslator'
import ClientError from '../../Commons/exceptions/ClientError'

const createServer = async (container: typeof containerInstance) => {
  const server = HapiServer({
    host: process.env.HOST,
    port: process.env.PORT,
  })

  await server.register([
    {
      plugin: Jwt,
    },
  ])

  server.auth.strategy('finami_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts: any) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  })

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: categories,
      options: { container },
    },
    {
      plugin: plannings,
      options: { container },
    },
    {
      plugin: settings,
      options: { container },
    },
    {
      plugin: transactions,
      options: { container },
    },
    {
      plugin: wallets,
      options: { container },
    },
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof Error) {
      // error handler manually
      const translatedError: any = DomainErrorTranslator.translate(response)

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        })
        newResponse.code(translatedError.statusCode)
        return newResponse
      }

      if (!translatedError.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: 'error',
        message: 'server error',
      })
      newResponse.code(500)
      return newResponse
    }

    return h.continue
  })

  return server
}

export default createServer
