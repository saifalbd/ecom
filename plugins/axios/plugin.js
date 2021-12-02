import axiosIs from 'axios'

const mix = (ax) => {
  ax.defaults.baseURL = 'http://redcomm.lara'

  // axiosWithoutToken.defaults.withCredentials = true;
  ax.defaults.headers.common['Access-Control-Allow-Origin'] = true
  if (window.app.app_access_key === undefined) {
    console.error(
      'window.app.app_access_key missing please update your config.js file'
    )
  }
  ax.defaults.headers.common.token = window.app.app_access_key
}

export default ({ app }, inject) => {
  const axiosWithoutToken = axiosIs.create()
  mix(axiosWithoutToken)
  inject('axiosWithoutToken', axiosWithoutToken)

  const axios = axiosIs.create()
  axios.defaults.withCredentials = false
  axios.interceptors.request.use(
    function (config) {
      console.log('call axios')
      // Do something before request is sent
      // const token = hasToken()
      // if (token) {
      //   config.headers.Authorization = token
      // } else {
      //   // router.push({ name: 'Login' })
      // }
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      console.error(error)

      if (error.response.status == 401) {
        // router.push({ name: 'Login' })
      }
      return Promise.reject(error)
    }
  )
  mix(axios)
  inject('axiosWithoutToken', axios)
}
