<template>
  <div>
    <div v-show="!countCarts">
      <EmtyCart />
    </div>

    <div v-show="countCarts">
      <client-only>
        <CheckOut />
      </client-only>
    </div>
  </div>
</template>

<script>
import CheckOut from '@/components/Pages/CheckOut/Index.vue'
import EmtyCart from '@/components/Pragment/EmtyCart.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  ssr: false,
  components: {
    CheckOut,
    EmtyCart
  },
  computed: {
    ...mapGetters('ShopingCart', ['countCarts']),
    ...mapState('ShopingCart', ['carts'])
  },
  created () {
    this.refreshCarts()
  },
  methods: {
    ...mapActions('ShopingCart', ['setItems']),
    async refreshCarts () {
      try {
        const items = this.carts.map((item) => {
          const price = item.price.formatted
          const { id, cartQuantities } = item
          return { id, cartQuantities, price }
        })
        const url = this.$apiUrl('app.dirtyCheck', {}, false)
        const { data } = await this.$axiosWithoutToken.post(url, { items })
        this.setItems(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
