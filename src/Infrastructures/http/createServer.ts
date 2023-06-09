import { join } from 'path'
import { cwd } from 'process'
import { server as HapiServer } from '@hapi/hapi'
import containerInstance from '../container'

import * as Jwt from '@hapi/jwt'
import * as Innert from '@hapi/inert'
import users from '../../Interfaces/http/api/users'
import authentications from '../../Interfaces/http/api/authentications'
import categories from '../../Interfaces/http/api/categories'
import plannings from '../../Interfaces/http/api/plannings'
import settings from '../../Interfaces/http/api/settings'
import transactions from '../../Interfaces/http/api/transactions'
import wallets from '../../Interfaces/http/api/wallets'
import DomainErrorTranslator from '../../Commons/exceptions/DomainErrorTranslator'
import ClientError from '../../Commons/exceptions/ClientError'
import uploads from '../../Interfaces/http/api/static'

const createServer = async (container: typeof containerInstance) => {
  const server = HapiServer({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['https://finami-nurmuhamadas.vercel.app'],
        headers: ['Accept', 'Content-Type', 'Authorization'],
      },
      files: {
        relativeTo: join(cwd(), 'public'),
      },
    },
  })

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Innert,
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
    validate: (artifacts: any) => {
      return {
        isValid: true,
        credentials: {
          ...artifacts.decoded.payload,
        },
      }
    },
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
    {
      plugin: uploads,
      options: { container },
    },
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response, path, url } = request

    if (response instanceof Error) {
      // error handler manually
      const translatedError: any = DomainErrorTranslator.translate(response)
      console.log(translatedError, path, url)

      if (translatedError instanceof ClientError) {
        const _newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        })
        _newResponse.code(translatedError.statusCode)
        return _newResponse
      }

      if (!translatedError.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: 'error',
        message:
          "Ups... Something wrong from our side :(\nDon't panic, we'll recover soon",
      })
      newResponse.code(500)
      return newResponse
    }

    return h.continue
  })

  return server
}

export default createServer
