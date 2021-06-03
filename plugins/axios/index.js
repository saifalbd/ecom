export default ({ $axios, redirect }, inject) => {
  $axios.defaults.headers.common.token =
    'b97500c3c086f33d38923c9adf96e6b2bce7579e57a45d25e4641ad5992fbf46'
  // store.dispatch('addApiToken', process.env.API_TOKEN)
  // try {
  //   if (typeof window !== 'undefined') {
  //     $axios.defaults.headers.common.token = window.app.app_access_key
  //     console.log('this should print only if window object actually exists')
  //   } else {
  //     $axios.defaults.headers.common.token = 'b97500c3c086f33d38923c9adf96e6b2bce7579e57a45d25e4641ad5992fbf46'
  //   }
  // } catch (error) {
  //   $axios.defaults.headers.common.token = process.env.API_TOKEN
  // }

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
