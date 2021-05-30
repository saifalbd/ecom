export default ({ $axios, redirect, store }, inject) => {
  store.dispatch('addApiToken', process.env.API_TOKEN)
  $axios.defaults.headers.common.token = 'f584c1f8a6e4fc4352fd973cfb3a9e437c44d20b1314acb4ee96a7a53c3783e2'
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
