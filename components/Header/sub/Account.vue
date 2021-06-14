<template>
  <b-button-group size="sm" variant="primary">
    <b-button v-if="!user" squared variant="primary" :to="{ name: 'login' }">
      <BIconUnlock /> <span>Login</span>
    </b-button>

    <b-button v-if="user" squared variant="primary" :to="{ name: 'dashboard' }">
      <b-avatar
        v-if="user && user.image"
        size="sm"
        variant="info"
        :src="user.image.url"
      />
      <!-- <b-icon-person-fill></b-icon-person-fill> -->

      <span class="d-none d-md-inline ml-2">{{ user.name }}</span>
    </b-button>
    <b-button v-if="user" squared variant="primary" :to="{ name: 'logout' }">
      <!-- @click="$auth.logOut()" -->
      <BIconLock />
      <span class="d-none d-md-inline">LogOut</span>
    </b-button>
  </b-button-group>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import { BIconLock, BIconUnlock } from 'bootstrap-vue'

export default {
  components: {
    BIconLock,
    BIconUnlock
  },
  computed: {
    user () {
      return this.$auth.user
    }
  }
}
</script>

<style lang="scss" scoped></style>
