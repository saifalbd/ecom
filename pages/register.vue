<template>
  <Vo ref="form">
    <b-overlay :show="busy" rounded="sm">
      <b-card bg-variant="light">
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
            name="Name"
            vid="name"
            rules="required"
          >
            <b-form-group
              class="mt-3"
              label="Name:"
              label-for="nested-name"
              label-cols-sm="4"
              label-align-sm="right"
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
            >
              <b-form-input id="nested-name" v-model="loginForm.name" />
            </b-form-group>
          </Vp>

          <Vp
            v-slot="{ valid, errors }"
            name="User Name"
            vid="userName"
            rules="required"
          >
            <b-form-group
              class="mt-3"
              label="User name:"
              label-for="nested-email"
              label-cols-sm="4"
              label-align-sm="right"
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
            >
              <b-form-input id="nested-email" v-model="loginForm.userName" />
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
              <b-form-input
                id="nested-pass"
                v-model="loginForm.password"
                type="password"
              />
            </b-form-group>
          </Vp>

          <Vp
            v-slot="{ valid, errors }"
            name="password_confirmed"
            vid="password_confirmation"
            rules="required"
          >
            <b-form-group
              label="Password ReType"
              label-for="nested-pass-con"
              label-cols-sm="4"
              label-align-sm="right"
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
            >
              <b-form-input
                id="nested-pass-con"
                v-model="loginForm.password_confirmation"
                type="password"
              />
            </b-form-group>
          </Vp>

          <b-row align-h="end" class="mt-3">
            <b-button squared size="sm" variant="dark" @click.stop="onSubmit">
              Submit
            </b-button>
          </b-row>

          <b-row align-h="end" class="mt-1">
            <b-button
              squared
              link
              size="sm"
              variant="link"
              :to="{ name: 'login' }"
            >
              Login Page
            </b-button>
          </b-row>
        </b-form-group>
      </b-card>
    </b-overlay>
  </Vo>
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
        name: '',
        userName: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('Auth', ['setToken']),
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }

      try {
        this.busy = true
        const url = this.$apiUrl('app.register', this.loginForm, false)

        const { data } = await this.$http.axiosWithoutToken.get(url)
        await this.setToken(data)

        if (this.isModel) {
          this.$emit('done', true)
        } else {
          setTimeout(() => {
            this.busy = false
            this.$router.push({
              name: 'index'
            })
          }, 1000)
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
