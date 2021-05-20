import store from '@/store'
import { isPlainObject } from 'lodash'
import r from './Resources'

/**
 * all get request
 */
export default class Put {
  // eslint-disable-next-line no-useless-constructor
  constructor (ctx) {
    this.ctx = ctx
  }

  async authProfile (params) {
    const user = store.getters['Auth/user']

    try {
      if (!user) {
        throw new ReferenceError('auth user not found')
      }
      if (!params) {
        throw new SyntaxError('from input values are missing', 'Put.js', 16)
      }
      if (!isPlainObject(params)) {
        throw new SyntaxError(
          'from input values must be a Object',
          'Put.js',
          16
        )
      }

      const url = await r.zRoute(
        'app.user.profile.update',
        { profile: user.id },
        false
      )

      return await this.ctx.$axios.put(url, params)
    } catch (error) {
      // console.error(error)
      return Promise.reject(error)
    }
  }

  /* --------------------------------- End authorized api ----------- */
}
