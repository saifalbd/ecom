export default ({ $axios, redirect, $config: { API_TOKEN } }, inject) => {
  $axios.defaults.headers.common.token = window.app.app_access_key
  // $axios.defaults.headers.common.token = API_TOKEN
  $axios.defaults.headers.common.baseURL = 'https://redcom.cloud'

  inject('axiosWithoutToken', $axios)

  const authAxios = (auth) => {
    try {
      if (!auth.loggedIn) {
        throw new Error('user not loggedIn')
      }
      const ax = $axios.create()
      ax.defaults.headers.common.token = window.app.app_access_key
      // ax.defaults.headers.common.token = API_TOKEN
      const userToken = auth.strategy.token.get()
      ax.defaults.headers.common.Authorization = `Bearer ${userToken}`
      return ax
    } catch (error) {
      console.error(error)
      redirect('/login')
    }
  }

  inject('authAxios', authAxios)
}
