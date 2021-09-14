<template>
  <b-card header-tag="header" footer="Card Footer" footer-tag="footer">
    <template #header>
      <h4 class="mb-0">
        CREATE AN ACCOUNT
      </h4>
    </template>
    <b-card-text>
      Please enter your mobile number create an Account
    </b-card-text>
    <!-- Using components -->
    <Vo ref="form">
      <Vp
        v-slot="{ valid, errors }"
        name="name"
        vid="name"
        :rules="{ required: true }"
      >
        <b-form-group :invalid-feedback="errors[0]" :state="vs(valid, errors)">
          <b-input-group prepend="name">
            <b-form-input v-model="name" />
          </b-input-group>
        </b-form-group>
      </Vp>
      <!-- Using components -->
      <Vp
        v-slot="{ valid, errors }"
        name="mobile"
        vid="userName"
        :rules="{ required: true }"
      >
        <b-form-group :invalid-feedback="errors[0]" :state="vs(valid, errors)">
          <b-input-group prepend="mobile" class="mt-3">
            <b-form-input v-model="mobile" />
          </b-input-group>
        </b-form-group>
      </Vp>
    </Vo>
    <template #footer>
      <div class="text-right">
        <b-button variant="outline-success" @click.stop="register">
          <BIconBullseye />
          CREATE
        </b-button>
      </div>
    </template>
  </b-card>
</template>
<script>
import { BIconBullseye } from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    BIconBullseye,
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  data () {
    return {
      mobile: '',
      name: ''
    }
  },
  methods: {
    ...mapActions('CheckOut', ['set_created_user']),
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    busy (val) {
      this.$emit('busy', val)
    },
    async loginByDetails (res, password = null) {
      const token = res.data.token
      const user = res.data.user
      this.userId = user.id
      this.$auth.options.redirect.home = false
      await this.$auth.setUserToken(token)
      console.log('set user token')
      await this.$auth.setUser(user)
      console.log('set user resource')

      this.$auth.strategy.token.set(token)
      this.$store.dispatch('set_logged_in', true)
      this.busyText = '...Wait Fetch User'
      const userRes = await this.$authAxios(this.$auth).get('/json/user')

      userRes.data.password = password
      this.busy(false)
      return Promise.resolve({ data: userRes.data })
    },
    async register () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }
      try {
        this.busy(true)
        const name = this.name
        const userName = this.mobile
        const password = 12345678
        // eslint-disable-next-line camelcase
        const password_confirmation = password
        const params = { name, userName, password, password_confirmation }
        const url = this.$apiUrl('app.register', params, false)
        this.busyText = '...Wait Create User'
        const res = await this.$axiosWithoutToken.get(url)
        this.loginByDetails(res, password)
        this.set_created_user({ userName, password })
      } catch (error) {
        this.busy(false)
        this.$formVError({ error, vue: this, ref: 'form' })
      }
    }
  }
}
</script>
