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
          Password Reset
        </div>
        <div class="reset-description">
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password. For security reasons, we do NOT
          store your password. So rest assured that we will never send your
          password via email.
        </div>

        <Vo ref="form" tag="div" class="input-group-box">
          <div class="input-box">
            <label for="">
              <span>
                new Password
              </span>
            </label>
            <Vp
              v-slot="{ errors }"
              name="new password"
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
          <div class="input-box">
            <label for="">
              <span>
                ReType Password
              </span>
            </label>
            <Vp
              v-slot="{ errors }"
              name="reype password"
              vid="password_confirmation"
              rules="required"
              class="input-parent"
              tag="div"
            >
              <input v-model="loginForm.password_confirmation">
              <span v-if="errors.length" class="invalid">
                {{ errors[0] }}
              </span>
            </Vp>
          </div>

          <button @click.stop="onSubmit">
            Send Request
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
        password: '',
        password_confirmation: ''
      }
    }
  },
  created () {
    // eslint-disable-next-line camelcase
    const { user_name, otp } = this.$route.query
    // eslint-disable-next-line camelcase
    if (!user_name && otp) {
      this.$router.go(-1)
      return false
    }
  },
  methods: {
    params () {
      // eslint-disable-next-line camelcase
      const { user_name, otp } = this.$route.query
      return { user_name, otp, ...this.loginForm }
    },
    async onSubmit () {
      try {
        const params = this.params()
        this.busy = true
        const url = this.$apiUrl('app.newPassword', {}, false)

        await this.$axiosWithoutToken.post(url, params)
        this.$router.push({
          name: 'login'
        })
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
