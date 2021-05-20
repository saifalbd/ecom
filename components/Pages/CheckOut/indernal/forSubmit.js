import { sumBy } from 'lodash'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('ShopingCart', ['removeAll']),
    makeSenditems () {
      const items = this.items()
      // eslint-disable-next-line camelcase
      const item_list = items.map((item) => {
        const id = item.id
        const quatities = item.cartQuantities
        const price = item.price.raw
        // eslint-disable-next-line camelcase
        const selected_vartians = item.selected_vartians
        return { id, quatities, price, selected_vartians }
      })
      const totalPrice = sumBy(item_list, 'price')
      // eslint-disable-next-line camelcase
      const address_id = this.selectedAddress
      // eslint-disable-next-line camelcase
      const payment_method = this.paymentMethod
      return { item_list, totalPrice, address_id, payment_method }
    },
    async submit () {
      this.busy = true
      try {
        const params = this.makeSenditems()
        const url = this.$apiUrl('app.orderPlace.store', {}, false)
        const { data } = await this.$authAxios(this.$auth).post(url, params)

        this.removeAll()

        const query = { order_id: data.order_id }
        if (this.createdUser) {
          query.userName = this.createdUser.userName
          query.password = this.createdUser.password
        }

        this.$router.push({ name: 'thankyou', query })
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
