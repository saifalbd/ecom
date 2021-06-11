<template>
  <b-link class="logo-box" to="/">
    <img v-if="logo" :src="logo.url">
  </b-link>
</template>

<script>
/* eslint-disable no-undef */
export default {
  created () {
    this.logo = app.logo
  }
}
</script>

<style lang="scss" scoped></style>
