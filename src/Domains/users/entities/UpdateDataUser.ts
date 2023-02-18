import { UpdateDataUserPayload, UpdateDataUserResult } from './types'

class UpdateDataUser {
  values: UpdateDataUserResult

  constructor(payload: UpdateDataUserPayload) {
    this._verifyPayload(payload)

    this.values = {
      ...payload,
      updated_at: new Date(),
    }
  }

  _verifyPayload({
    username,
    email,
    password,
    fullname,
    image_url,
  }: UpdateDataUserPayload) {
    if (username.length > 30)
      throw new Error('UPDATE_DATA_USER.USERNAME_LIMIT_CHAR')
    if (!username.match(/^[\w]+$/))
      throw new Error('UPDATE_DATA_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')

    if (email.length > 30) throw new Error('UPDATE_DATA_USER.EMAIL_LIMIT_CHAR')
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      throw new Error('UPDATE_DATA_USER.INVALID_EMAIL')

    if (password.length > 30)
      throw new Error('UPDATE_DATA_USER.PASSWORD_LIMIT_CHAR')
    if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm))
      throw new Error('UPDATE_DATA_USER.INVALID_PASSWORD')

    if (fullname.length > 50)
      throw new Error('UPDATE_DATA_USER.FULLNAME_LIMIT_CHAR')

    if (
      image_url &&
      image_url.match(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      )
    )
      throw new Error('UPDATE_DATA_USER.INVALID_IMAGE_URL')
  }
}

export default UpdateDataUser
