export default ({ app, $auth }, inject) => {
  app.$axios.defaults.headers.common.token = process.env.API_TOKEN
  inject('axiosWithoutToken', app.$axios)
  // const authAxios = app.$axios.create()
  console.log($auth)
  // const userToken = context.$auth.token.get()
  // authAxios.headers.Authorization = userToken
  // inject('authAxios', authAxios)
}
