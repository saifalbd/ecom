<template>
  <div class="signInUp" :style="`background-image: url('${vector}')`">
    <div class="main-box">
      <div class="top-bar">
        <div class="top-left">
          <a href="/">home</a>
        </div>
        <div class="top-right">
          Not a member?
          <a href="/register">
            Sign up now
          </a>
        </div>
      </div>
      <div class="box">
        <div class="title">
          Login Form
        </div>
        <div class="social-info">
          <a href="#" class="item">
            <span class="icon">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                />
              </svg>
            </span>
            <span class="text">
              Login with facebook
            </span>
          </a>
          <a href="#" class="item">
            <span class="icon">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                />
              </svg>
            </span>
            <span class="text">
              Login with Google
            </span>
          </a>
        </div>
        <div class="or">
          <span>
            OR
          </span>
        </div>
        <Vo ref="form" tag="div" class="input-group-box">
          <div class="input-box">
            <label for="">
              <span>
                Username or Email or PhoneNumber
              </span>
            </label>
            <Vp
              v-slot="{ errors }"
              name="user name"
              vid="email"
              rules="required"
              class="input-parent"
              tag="div"
            >
              <input v-model="loginForm.email">
              <span v-if="errors.length" class="invalid">
                {{ errors[0] }}
              </span>
            </Vp>
          </div>
          <div class="input-box">
            <label for="">
              <span>
                Password
              </span>
              <a href="/password/reset">
                Forgot password
              </a>
            </label>
            <Vp
              v-slot="{ errors }"
              name="password"
              vid="password"
              rules="required"
              class="input-parent"
              tag="div"
            >
              <input v-model="loginForm.password">
              <span v-if="errors.length" class="invalid">
                {{ errors[0] }}
              </span>
            </Vp>
          </div>
          <button @click.stop="onSubmit">
            login
          </button>
          <div class="loader-box" :class="{ busy }">
            <div class="loader-circle" />
          </div>
        </Vo>
      </div>
    </div>
  </div>
</template>

<script>
import vector from '@/assets/login.jpg'
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  beforeRouteEnter (to, from, next) {
    // window.localStorage.removeItem('vuex');
    next((vm) => {
      vm.fromRoute = from
    })
  },
  layout: 'basic',

  data () {
    return {
      vector,
      busy: false,
      loginForm: {
        email: this.$isDev('user@gmail.com', ''),
        password: this.$isDev('12345678', '')
      }
    }
  },
  methods: {
    ...mapActions('Auth', ['setToken']),
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },

    async onSubmit () {
      this.busy = true
      try {
        const email = this.loginForm.email
        const password = this.loginForm.password
        const params = { email, password }
        const res = await this.$auth.loginWith('laravelSanctum', {
          data: params
        })

        const token = res.data.token
        const user = res.data.user
        await this.$auth.setUserToken(token)
        console.log('set user token')
        await this.$auth.setUser(user)
        console.log('set user resource')

        this.$auth.strategy.token.set(token)
        this.$store.dispatch('set_logged_in', true)
        if (this.$store.state.auth.loggedIn) {
          await this.$router.push({ name: 'index' })
        }
      } catch (error) {
        console.error(error)
        this.$formVError({ error, vue: this, ref: 'form' })
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
