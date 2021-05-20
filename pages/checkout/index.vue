<template>
  <no-ssr>
    <CheckOut />
  </no-ssr>
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
