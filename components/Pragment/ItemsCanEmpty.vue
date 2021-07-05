<template>
  <div v-show="show" class="emty-carts">
    <BIconCartDash />
    <div class="text">
      Related Items Not Found
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
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goTo () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
