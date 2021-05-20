<template>
  <b-col cols="12 d-none d-sm-block">
    <b-row>
      <slot />
      <b-col cols="4" class="text-right mt-2">
        <b-button-group size="sm">
          <b-button
            v-if="!user"
            squared
            variant="light"
            :to="{ name: 'login' }"
          >
            <BIconUnlock /> <span>Login</span>
          </b-button>

          <b-button v-if="user" squared variant="light" :to="{ name: 'index' }">
            <b-avatar
              v-if="user && user.image"
              size="sm"
              variant="info"
              :src="user.image.url"
            />
            <!-- <b-icon-person-fill></b-icon-person-fill> -->

            <span class="d-none d-md-inline ml-2">{{ user.name }}</span>
          </b-button>
          <b-button
            v-if="user"
            squared
            variant="light"
            :to="{ name: 'logout' }"
          >
            <!-- @click="$auth.logOut()" -->
            <BIconLock />
            <span class="d-none d-md-inline">LogOut</span>
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { BIconLock, BIconUnlock } from 'bootstrap-vue'
export default {
  components: {
    BIconLock,
    BIconUnlock
  },
  data () {
    return {}
  },
  computed: {
    isLogin () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  }
}
</script>
