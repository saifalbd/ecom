// eslint-disable-next-line quotes
const routes = require('./ConfigRoute.json')

// eslint-disable-next-line arrow-parens
export default isProd => {
  // eslint-disable-next-line quotes
  const host = 'https://redcom.cloud'
  return {
    url: host,
    port: null,
    defaults: [],
    routes
    // eslint-disable-next-line semi
  }
  // eslint-disable-next-line semi
}
