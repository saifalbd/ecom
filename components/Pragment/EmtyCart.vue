<template>
  <div class="emty-carts">
    <BIconCartDash />
    <div class="text">
      Your Cart is Empty!
    </div>
    <button class="goto" @click.stop="goTo">
      Continue to Shoping
    </button>
  </div>
</template>

<script>
import { BIconCartDash } from 'bootstrap-vue'
export default {
  components: {
    BIconCartDash
  },
  methods: {
    goTo () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
