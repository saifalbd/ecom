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
  computed: mapGetters('ShopingCart', ['countCarts'])
}
</script>
