<template>
  <div class="cart-side-icon" @click.stop="goto">
    <button>
      <BIconCart4 />
      <button>
        {{ countCarts }}
      </button>
    </button>
    <div class="amount">
      {{ totalCartPrices }} Taka
    </div>
  </div>
</template>

<script>
import { BIconCart4 } from 'bootstrap-vue'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  components: {
    BIconCart4
  },
  computed: {
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices'])
  },
  methods: {
    goto () {
      this.$router.push({ name: 'checkout' })
    }
  }
}
</script>
