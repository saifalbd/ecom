import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('ShopingCart', ['carts']),
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices'])
  },
  methods: {
    items () {
      return this.carts
    },
    numberOfItems () {
      return this.countCarts
    },
    sumOfPrices () {
      return this.totalCartPrices
    }
  }
}
