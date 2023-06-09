import { RegisterUserResult, RegisterUserPayload } from './types'

class RegisterUser {
  values: RegisterUserResult

  constructor(payload: RegisterUserPayload) {
    this._verifyPayload(payload)

    const now = new Date()
    this.values = {
      ...payload,
      parent_id: payload.parent_id || null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

  _verifyPayload({
    id,
    username,
    email,
    password,
    fullname,
    parent_id,
    image_url,
  }: RegisterUserPayload) {
    if (!id.startsWith('user-') || id.length !== 20)
      throw new Error('REGISTER_USER.INVALID_ID')

    if (username.length > 30)
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')
    if (!/^[\w]+$/.test(username))
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')

    if (email.length > 50) throw new Error('REGISTER_USER.EMAIL_LIMIT_CHAR')
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
      throw new Error('REGISTER_USER.INVALID_EMAIL')

    if (password.length > 30)
      throw new Error('REGISTER_USER.PASSWORD_LIMIT_CHAR')
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password))
      throw new Error('REGISTER_USER.INVALID_PASSWORD')

    if (fullname.length > 50)
      throw new Error('REGISTER_USER.FULLNAME_LIMIT_CHAR')

    if (
      parent_id &&
      (!parent_id.startsWith('user-') || parent_id.length !== 20)
    )
      throw new Error('REGISTER_USER.INVALID_PARENT_ID')

    if (
      image_url &&
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
        image_url,
      )
    )
      throw new Error('REGISTER_USER.INVALID_IMAGE_URL')
  }
}

export default RegisterUser
