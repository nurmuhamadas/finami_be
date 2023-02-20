import AuthenticationError from './AuthenticationError'
import AuthorizationError from './AuthorizationError'
import ClientError from './ClientError'
import InvariantError from './InvariantError'
import NotFoundError from './NotFoundError'

type ErrorsType =
  | InvariantError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | ClientError
export type DomainErrorTranslatorType = {
  translate: (error: Error) => ErrorsType | string | Error
  errorMessageGenerator: (message: string) => ErrorsType | string
}
