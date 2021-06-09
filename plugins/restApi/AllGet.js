import { validate, mixer } from '@/plugins/product/index'
import store from '@/store'
import { isPlainObject } from 'lodash'
import r from './Resources'

/**
 * all get request
 */
export default class AllGet {
  // eslint-disable-next-line no-useless-constructor
  constructor (ctx) {
    this.ctx = ctx
  }

  async categories () {
    try {
      const url = await r.zRoute('app.category.index', {}, false)
      const { data } = await this.ctx.$axiosWithoutToken.get(url)
      return Promise.resolve({ data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async categoryShowItems (params) {
    if (!isPlainObject(params)) {
      const e = 'items parms must be object'
      console.error(e)
      alert(e)
      return undefined
    }

    try {
      const url = this.ctx.$apiUrl('app.category.show.items', params, false)
      const { data } = await this.ctx.$axiosWithoutToken.get(url)
      return Promise.resolve({ data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   *
   * @returns Promise(data or error)
   */
  async items (params = {}) {
    if (!isPlainObject(params)) {
      const e = 'items parms must be object'
      console.error(e)
      alert(e)
      return undefined
    }
    const url = this.ctx.$apiUrl('app.item.index', params, false)

    try {
      const { data } = await this.ctx.$axiosWithoutToken.get(url)
      data.data.map((item) => {
        validate(item)
        return mixer(item)
      })
      return Promise.resolve({ data })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   *
   * @returns Promise(data or error)
   */
  async itemShow (slug) {
    const url = this.ctx.$apiUrl('app.item.show', { item: slug }, false)

    try {
      const { data } = await this.ctx.$axiosWithoutToken.get(url)
      // validate(data );

      const d = mixer(data)
      return Promise.resolve({ data: d })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   *
   * @returns
   */
  async bannrs () {
    try {
      const url = await r.zRoute('app.bannars', {}, false)

      return await this.ctx.$axiosWithoutToken.get(url)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async offers () {
    try {
      const url = await r.zRoute('app.offer-bannars', {}, false)

      return await this.ctx.$axiosWithoutToken.get(url)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /** --------------------------------- Start authorized api ----------- */
  async orders () {
    try {
      const url = await r.zRoute('app.dashboard.order', {}, false)
      const { data } = await this.ctx.$axios.get(url)

      return Promise.resolve({ data })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async authProfile (forUpdate = false) {
    const user = store.getters['Auth/user']

    try {
      if (!user) {
        throw new ReferenceError('auth user not found')
      }

      const url = await r.zRoute(
        'app.user.profile.show',
        { profile: user.id, forUpdate },
        false
      )
      return await this.ctx.$axios.get(url)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }
  /** --------------------------------- End authorized api ----------- */
}
