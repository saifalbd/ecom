import { ziggyRoute } from '../ziggy'

export default {
  // eslint-disable-next-line require-await
  async zRoute (name, params, absolute, config) {
    const zConfig = window.app.ziggy

    const r = ziggyRoute(zConfig)(name, params, absolute, config)
    return Promise.resolve(r)
  }
}
