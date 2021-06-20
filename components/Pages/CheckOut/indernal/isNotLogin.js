import { mapActions, mapGetters } from 'vuex'
import phoneConverter from './phoneConverter'
export default {
  computed: mapGetters('Auth', ['token']),
  methods: {
    ...mapActions('Auth', ['setToken', 'setUser']),
    async loginByDetails (res, password = null) {
      const token = res.data.token
      const user = res.data.user
      this.userId = user.id
      this.$auth.options.redirect.home = false
      await this.$auth.setUserToken(token)
      console.log('set user token')
      await this.$auth.setUser(user)
      console.log('set user resource')

      this.$auth.strategy.token.set(token)
      this.$store.dispatch('set_logged_in', true)
      this.busyText = '...Wait Fetch User'
      const userRes = await this.$authAxios(this.$auth).get('/json/user')

      userRes.data.password = password

      return Promise.resolve({ data: userRes.data })
    },
    async loginById (id) {
      try {
        const url = this.$apiUrl('app.loginById', { id }, false)
        const res = await this.$axiosWithoutToken.get(url)
        return this.loginByDetails(res, null)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async register (phone) {
      try {
        const name = this.address.name
        const userName = phone
        const password = 12345678
        // eslint-disable-next-line camelcase
        const password_confirmation = password
        const params = { name, userName, password, password_confirmation }
        const url = this.$apiUrl('app.register', params, false)
        this.busyText = '...Wait Create User'
        const res = await this.$axiosWithoutToken.get(url)
        return this.loginByDetails(res, password)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async doResister (phone) {
      try {
        const { data } = await this.register(phone)
        data.userName = this.address.phone
        this.$emit('createdUser', data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
