<template>
  <div class="login-box">
    <client-only>
      <b-overlay :show="busy">
        <b-card-group deck>
          <Register @busy="busy = $event" />
          <Login @busy="busy = $event" />
        </b-card-group>
      </b-overlay>
    </client-only>
  </div>
</template>

<script>
import Register from './Sub/Register.vue'
import Login from './Sub/Login.vue'
export default {
  components: {
    Register,
    Login
  },
  data () {
    return {
      busy: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
