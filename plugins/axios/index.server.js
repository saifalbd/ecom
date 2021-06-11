export default ({ $axios, redirect }, inject) => {
  $axios.defaults.headers.common.token = process.env.API_TOKEN
  $axios.defaults.headers.common.baseURL = 'https://redcom.cloud'

  inject('axiosWithoutToken', $axios)

  const authAxios = (auth) => {
    try {
      if (!auth.loggedIn) {
        throw new Error('user not loggedIn')
      }
      const ax = $axios.create()
      $axios.defaults.headers.common.token = process.env.API_TOKEN
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
