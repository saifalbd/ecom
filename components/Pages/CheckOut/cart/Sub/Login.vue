<template>
  <b-card header-tag="header" footer-tag="footer">
    <template #header>
      <h4 class="mb-0">
        ALREADY REGISTERED?
      </h4>
    </template>
    <Vo ref="form">
      <Vp
        v-slot="{ valid, errors }"
        name="name"
        vid="email"
        :rules="{ required: true }"
      >
        <b-form-group :invalid-feedback="errors[0]" :state="vs(valid, errors)">
          <!-- Using components -->
          <b-input-group prepend="Username" class="mt-2">
            <b-form-input v-model="userName" />
          </b-input-group>
        </b-form-group>
      </Vp>
      <Vp
        v-slot="{ valid, errors }"
        name="password"
        vid="password"
        :rules="{ required: true }"
      >
        <b-form-group :invalid-feedback="errors[0]" :state="vs(valid, errors)">
          <!-- Using components -->
          <b-input-group prepend="Password" class="mt-3">
            <b-form-input v-model="password" />
          </b-input-group>
        </b-form-group>
      </Vp>
    </Vo>
    <template #footer>
      <div class="text-right">
        <b-button variant="outline-success" @click.stop="login">
          <BIconBullseye />
          Login
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import { BIconBullseye } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    BIconBullseye,
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    busy (val) {
      this.$emit('busy', val)
    },
    async login () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }
      try {
        this.busy(true)
        const email = this.userName
        const password = this.password
        if (!email || !password) {
          return null
        }
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
      } catch (error) {
        this.$formVError({ error, vue: this, ref: 'form' })
        console.error(error)
      }
      this.busy(false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
