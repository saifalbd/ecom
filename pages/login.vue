<template>
  <no-ssr>
    <Vo ref="form">
      <b-overlay :show="busy" rounded="sm">
        <b-card bg-variant="light">
          <div v-if="$auth.loggedIn">
            login
          </div>
          <b-form-group
            :label-cols-lg="isModel ? 12 : 4"
            label="Login"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <template #label>
              <alternative v-if="!isModel" />
            </template>
            <Vp
              v-slot="{ valid, errors }"
              name="User Name"
              vid="email"
              rules="required"
            >
              <b-form-group
                class="mt-3"
                label="User name:"
                label-for="nested-email"
                label-cols-sm="4"
                label-align-sm="right"
                :invalid-feedback="errors[0]"
                description="email || phone || user name"
                :state="vs(valid, errors)"
              >
                <b-form-input id="nested-email" v-model="loginForm.email" />
              </b-form-group>
            </Vp>

            <Vp
              v-slot="{ valid, errors }"
              name="password"
              vid="password"
              rules="required"
            >
              <b-form-group
                label="Password "
                label-for="nested-pass"
                label-cols-sm="4"
                label-align-sm="right"
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
              >
                <b-form-input id="nested-pass" v-model="loginForm.password" />
              </b-form-group>
            </Vp>

            <b-form-group
              v-if="!isModel"
              v-slot="{ ariaDescribedby }"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
            >
              <b-form-checkbox :aria-describedby="ariaDescribedby">
                remember me
              </b-form-checkbox>
            </b-form-group>
            <b-row align-h="end" class="mt-3">
              <b-button squared size="sm" variant="dark" @click.stop="onSubmit">
                Submit
              </b-button>
            </b-row>
            <b-row align-h="end" class="mt-2">
              <b-button squared size="sm" variant="link">
                Forgot Password
              </b-button>
            </b-row>
            <b-row align-h="end" class="mt-1">
              <b-button
                squared
                link
                size="sm"
                variant="link"
                :to="{ name: 'register' }"
              >
                Register
              </b-button>
            </b-row>
          </b-form-group>
        </b-card>
      </b-overlay>
    </Vo>
  </no-ssr>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import alternative from '@/components/Pages/LoginRegister/fragment/alternative.vue'

export default {
  components: {
    alternative,
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  beforeRouteEnter (to, from, next) {
    // window.localStorage.removeItem('vuex');
    next((vm) => {
      vm.fromRoute = from
    })
  },
  layout: 'loginRegister',
  props: {
    isModel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      busy: false,
      loginForm: {
        email: 'user@gmail.com',
        password: '12345678'
      },
      fromRoute: null
    }
  },
  methods: {
    ...mapActions('Auth', ['setToken']),
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },

    async onSubmit () {
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
      } catch (error) {
        console.error(error)
      }
    },

    async onSubmits () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }

      try {
        this.busy = true
        const url = this.$apiUrl('app.login', this.loginForm, false)

        const { data } = await this.$axiosWithoutToken.get(url)
        await this.setToken(data)

        if (this.isModel) {
          this.$emit('done', true)
        } else if (this.fromRoute) {
          this.$router.back()
        } else {
          this.busy = false
          this.$router.push({
            name: 'auth.home'
          })
        }
      } catch (error) {
        console.error(error)
        this.$formVError({ error, vue: this, ref: 'form', callBack () {} })
      }
      this.busy = false
    }
  }
}
</script>
