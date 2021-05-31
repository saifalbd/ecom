export default ({ $axios, redirect, store }, inject) => {
  store.dispatch('addApiToken', process.env.API_TOKEN)
  if (typeof window !== 'undefined') {
    $axios.defaults.headers.common.token = window.app.app_token
    console.log('this should print only if window object actually exists')
  } else {
    $axios.defaults.headers.common.token = process.env.API_TOKEN
  }

  inject('axiosWithoutToken', $axios)

  const authAxios = (auth) => {
    try {
      if (!auth.loggedIn) {
        throw new Error('user not loggedIn')
      }
      const ax = $axios.create()
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
