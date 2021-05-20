import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters('Auth', ['token']),
  methods: {
    ...mapActions('Auth', ['setToken', 'setUser']),
    async register () {
      try {
        const name = this.address.name
        const userName = this.address.phone
        const password = 12345678
        // eslint-disable-next-line camelcase
        const password_confirmation = password
        const params = { name, userName, password, password_confirmation }
        const url = this.$apiUrl('app.register', params, false)
        const res = await this.$axiosWithoutToken.get(url)

        const token = res.data.token
        const user = res.data.user
        this.$auth.options.redirect.home = false
        await this.$auth.setUserToken(token)
        console.log('set user token')
        await this.$auth.setUser(user)
        console.log('set user resource')

        this.$auth.strategy.token.set(token)

        const userRes = await this.$authAxios(this.$auth).get('/json/user')

        userRes.data.password = password

        return Promise.resolve({ data: userRes.data })
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
