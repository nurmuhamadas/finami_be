import { DomainErrorTranslatorType } from './types'

const InvariantError = require('./InvariantError')

const DomainErrorTranslator: DomainErrorTranslatorType = {
  errorMessageGenerator: (message: string) => {
    let _message = message
    const [domain, messageCode] = message

    if (domain.includes('REGISTER_')) {
      _message = `can't create new ${domain
        .replace('REGISTER_', '')
        .toLowerCase()}, `
    } else if (domain.includes('UPDATE_DATA_')) {
      _message = `can't update ${domain
        .replace('UPDATE_DATA_', '')
        .toLowerCase()}, `
    }

    if (messageCode.includes('INVALID_PASSWORD')) {
      message += `can't create new user, password should contain lowercase, uppercase, number, special character, and minimal 8 character.`
    } else if (messageCode.includes('INVALID_')) {
      message += `invalid ${domain.replace('INVALID_', '').toLowerCase()}.`
    } else if (messageCode.includes('_LIMIT_CHAR')) {
      message += `${domain.replace('_LIMIT_CHAR', '').toLowerCase()} too long.`
    } else if (messageCode.includes('_CONTAIN_RESTRICTED_CHARACTER')) {
      message += `${domain
        .replace('_CONTAIN_RESTRICTED_CHARACTER', '')
        .toLowerCase()} contain restricted character.`
    }

    return new InvariantError(_message)
  },
  translate(error) {
    return this.errorMessageGenerator(error.message)
  },
}

export default DomainErrorTranslator
