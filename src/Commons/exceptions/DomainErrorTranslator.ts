import { DomainErrorTranslatorType } from './types'

import InvariantError from './InvariantError'

const DomainErrorTranslator: DomainErrorTranslatorType = {
  errorMessageGenerator: (error) => {
    console.log(error)
    if (!error.message.includes('.') || !error.message.includes('_')) {
      return error
    }

    let _message = ''
    const [domain, messageCode] = error.message.split('.')

    if (domain.includes('REGISTER_')) {
      _message = `Failed to create new ${domain
        .replace('REGISTER_', '')
        .toLowerCase()}, `
    } else if (domain.includes('UPDATE_DATA_')) {
      _message = `can't update ${domain
        .replace('UPDATE_DATA_', '')
        .toLowerCase()}, `
    }

    if (messageCode.includes('INVALID_PASSWORD')) {
      _message += `password should contain lowercase, uppercase, number, special character, and minimal 8 character.`
    } else if (messageCode.includes('START_DATE_SHOULD_BEFORE_END_DATE')) {
      _message += 'Start date should before end date'
    } else if (messageCode.includes('INVALID_')) {
      _message += `invalid ${messageCode
        .replace('INVALID_', '')
        .toLowerCase()}.`
    } else if (messageCode.includes('_LIMIT_CHAR')) {
      _message += `${messageCode
        .replace('_LIMIT_CHAR', '')
        .toLowerCase()} too long.`
    } else if (messageCode.includes('_CONTAIN_RESTRICTED_CHARACTER')) {
      _message += `${messageCode
        .replace('_CONTAIN_RESTRICTED_CHARACTER', '')
        .toLowerCase()} contain restricted character.`
    }

    return new InvariantError(_message)
  },
  translate(error) {
    return this.errorMessageGenerator(error)
  },
}

export default DomainErrorTranslator
