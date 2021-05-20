<template>
  <div>
    <b-modal v-model="dialog" hide-footer title="Shipping Address">
      <b-overlay :show="busy">
        <Vo ref="shiping">
          <b-card bg-variant="light" no-footer border-variant="light">
            <Vp
              v-slot="{ valid, errors }"
              name="Address type"
              :vid="`type`"
              :rules="{ required: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Address type:"
                label-for="nested-type"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select
                  id="nested-type"
                  v-model="address.type"
                  :disabled="isEdit"
                  :options="['Home', 'Office']"
                />
              </b-form-group>
            </Vp>

            <Vp
              v-slot="{ valid, errors }"
              name="name"
              :vid="`name`"
              :rules="{ required: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Name:"
                label-for="nested-name"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input id="nested-name" v-model="address.name" />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="phone"
              :vid="`phone`"
              :rules="{ required: false }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Phone:"
                label-for="nested-phone"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input id="nested-phone" v-model="address.phone" />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="Alternative Phone Number"
              :vid="`alt_phone`"
              :rules="{ required: false }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Alt phone:"
                label-for="nested-alt_phone"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  id="nested-alt_phone"
                  v-model="address.alt_phone"
                  placeholder="Alternative Phone Number"
                />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="city"
              vid="city"
              :rules="{ required: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="City:"
                label-for="nested-city"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <!-- //bibag -->
                <b-form-input id="nested-city" v-model="address.city" />
              </b-form-group>
            </Vp>

            <Vp
              v-slot="{ valid, errors }"
              name="area"
              vid="area"
              :rules="{ required: true }"
              tag="div"
            >
              <!-- thana -->
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Area:"
                label-for="nested-area"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input id="nested-area" v-model="address.area" />
              </b-form-group>
            </Vp>

            <Vp
              v-slot="{ valid, errors }"
              name="country"
              vid="country"
              :rules="{ required: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Country:"
                label-for="nested-country"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  id="nested-country"
                  v-model="address.country"
                  disabled
                />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="House/Street/Village"
              vid="details"
              :rules="{ required: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="House/Street/Village:"
                label-for="nested-details"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-textarea
                  id="nested-details"
                  v-model="address.details"
                />
              </b-form-group>
            </Vp>

            <b-row>
              <b-col cols="12">
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="danger"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  <p>{{ userCreateErrormessage }}</p>
                  <b-progress
                    variant="warning"
                    :max="30"
                    :value="dismissCountDown"
                    height="4px"
                  />
                </b-alert>
              </b-col>
            </b-row>

            <b-row align-h="end">
              <b-button squared @click="submit">
                Submit
              </b-button>
            </b-row>
          </b-card>
        </Vo>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import { has } from 'lodash'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import isNotLogin from '../../indernal/isNotLogin'
export default {
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  mixins: [isNotLogin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    editItem: {
      type: Object,
      default () {
        return {}
      }
    },
    withRegister: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      address: {
        type: 'Home',
        name: this.$isDev('Saiful islam', ''),
        phone: this.$isDev('01715042041', ''),
        alt_phone: '',
        city: this.$isDev('Moulvibazar', ''),
        area: this.$isDev('Moulvibazar', ''),
        country: 'Bangladesh',
        details: this.$isDev('house no:6 Mohammadpur Housing Society', '')
      },
      busy: false,

      // user Create alert start

      dismissCountDown: 0,
      userCreateErrormessage: ''
      // user Create alert end
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    isWantRegister () {
      if (this.isEdit) {
        return 0
      }
      return this.withRegister ? 1 : 0
    }
  },
  created () {
    if (this.isEdit) {
      try {
        if (!Object.keys(this.editItem).length) {
          // eslint-disable-next-line no-throw-literal
          throw 'edit item data are missing'
        }
        const {
          type,
          name,
          phone,
          // eslint-disable-next-line camelcase
          alt_phone,
          city,
          area,
          country,
          details
        } = this.editItem
        this.address = {
          type,
          name,
          phone,
          alt_phone,
          city,
          area,
          country,
          details
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    params () {
      const add = this.address

      return add
    },
    async wantToResister () {
      if (this.isWantRegister) {
        try {
          const { data } = await this.register()
          data.userName = this.address.phone
          this.$emit('createdUser', data)
        } catch (error) {
          return Promise.reject(error)
        }
      } else {
        return Promise.resolve(true)
      }
    },
    async submit () {
      const isValid = await this.$refs.shiping.validate()
      if (!isValid) {
        return false
      }
      try {
        this.busy = true
        let url
        let method

        if (this.isEdit) {
          url = this.$apiUrl(
            'app.shipingAddress.update',
            {
              shiping_address: this.editItem.id
            },
            false
          )
          method = 'patch'
        } else {
          url = this.$apiUrl('app.shipingAddress.store', {}, false)
          method = 'post'
        }

        await this.wantToResister()

        const { data } = await this.$authAxios(this.$auth)[method](url, this.params())

        this.dialog = false

        this.$emit('done', data)
      } catch (error) {
        if (error.response) {
          const { response } = error
          const { status, data } = response
          if (status == 422) {
            const { errors } = data
            if (has(errors, 'userName')) {
              const e =
                'Phone number already exist from other users please login first then make order'
              this.userCreateErrormessage = e
              this.dismissCountDown = 30
              error.response.data.errors.phone = e
            }
          }
        }
        this.$formVError({ error, vue: this, ref: 'shiping' })
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>
