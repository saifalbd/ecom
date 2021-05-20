<template>
  <div>
    logout
  </div>
</template>

<script>
export default {
  layout: 'loginRegister',
  async created () {
    await this.$auth.logout()
  }
}
</script>
