/* eslint-disable camelcase */
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
          Password Otp
        </div>
        <div class="reset-description">
          {{ message() }}
        </div>
        <div class="title">
          Timer: {{ timer }}
        </div>

        <Vo ref="form" tag="div" class="input-group-box">
          <div class="input-box">
            <label for="">
              <span>
                otp
              </span>
            </label>
            <Vp
              v-slot="{ errors }"
              name="otp"
              vid="otp"
              rules="required"
              class="input-parent"
              tag="div"
            >
              <input v-model="otp">
              <span v-if="errors.length" class="invalid">
                {{ errors[0] }}
              </span>
            </Vp>
          </div>

          <button @click.stop="validate">
            Submit
          </button>
          <button v-if="permissionResend" @click.stop="resendsend">
            resend Otp Request
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
      timer: '',
      permissionResend: false,
      busy: false,
      otp: this.$isDev('64821', '')
    }
  },
  created () {
    if (!this.userName()) {
      this.$router.go(-1)
      return false
    }
    this.counter()
  },

  methods: {
    message () {
      return this.$route.query.message
    },
    userName () {
      return this.$route.query.user_name
    },
    params () {
      // eslint-disable-next-line camelcase
      const user_name = this.userName()
      const otp = this.otp
      return { user_name, otp }
    },
    counter () {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth()
      const hour = d.getHours()
      const day = d.getDay()
      const dd = new Date(year, month, day, hour, 0, 0, 0)
      let count = 0
      const interval = setInterval(() => {
        dd.setSeconds(count)
        const min = dd.getMinutes()
        const sec = dd.getSeconds()
        const text = `${min}:${sec}`
        this.timer = text
        count++
        if (count === 601) {
          clearInterval(interval)
          this.permissionResend = true
        }
      }, 1000)
    },
    async resendsend () {
      try {
        this.busy = true
        const url = this.$apiUrl('app.forgotPasswod', {}, false)

        const { data } = await this.$axiosWithoutToken.post(url, {
          user_name: this.userName()
        })
        this.$router.push({
          name: 'password-otp',
          query: { user_name: this.userName(), message: data }
        })
      } catch (error) {
        console.error(error)
        this.$formVError({ error, vue: this, ref: 'form' })
      }
      this.busy = false
      this.permissionResend = false
    },
    async validate () {
      try {
        const params = this.params()
        this.busy = true
        const url = this.$apiUrl('app.otpValidate', {}, false)
        await this.$axiosWithoutToken.post(url, params)
        this.$router.push({ name: 'password-new-password', query: params })
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
