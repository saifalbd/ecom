import { ziggyRoute } from '../ziggy'
import resources from '../ziggy/config'

export default {
  // eslint-disable-next-line require-await
  async zRoute (name, params, absolute, config) {
    const zConfig = ziggyRoute(resources(process.env.NODE_ENV == 'production'))

    const r = ziggyRoute(zConfig)(name, params, absolute, config)
    return Promise.resolve(r)
  }
}
