<template>
  <client-only>
    <CheckOut />
  </client-only>
</template>

<script>
import CheckOut from '@/components/Pages/CheckOut/Index.vue'
export default {
  ssr: false,
  components: {
    CheckOut
  }
}
</script>
