export default ({ $axios, redirect }, inject) => {
  $axios.defaults.headers.common.token = window.app.app_access_key
  $axios.defaults.headers.common.baseURL = 'http://ginnibazar.lara'

  inject('axiosWithoutToken', $axios)

  const authAxios = (auth) => {
    try {
      if (!auth.loggedIn) {
        throw new Error('user not loggedIn')
      }
      const ax = $axios.create()
      ax.defaults.headers.common.token = window.app.app_access_key
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
