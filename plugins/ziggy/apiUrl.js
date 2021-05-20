import resources from './config'
import { ziggyRoute } from './index.js'
export default ({ app }, inject) => {
  const config = ziggyRoute(resources(process.env.NODE_ENV == 'production'))
  inject('apiUrl', config)
}
