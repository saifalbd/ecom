<template>
  <div style="background-color:red">
    <b-overlay :show="busy">
      <template #overlay>
        <div class="d-flex align-items-center">
          <b-spinner small type="grow" variant="secondary" />
          <b-spinner type="grow" variant="dark" />
          <b-spinner small type="grow" variant="secondary" />
          <!-- We add an SR only text for screen readers -->
          <span>
            {{ busyText }}
          </span>
        </div>
      </template>
      <Vo ref="shiping">
        <b-card bg-variant="light" no-footer border-variant="light">
          <Vp
            v-slot="{ valid, errors }"
            name="phone"
            :vid="`phone`"
            :rules="{ required: false, phone: true }"
            tag="div"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="Phone:"
              label-for="nested-phone"
              label-cols-sm="3"
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-phone"
                v-model="address.phone"
                :dense="dense"
                :read-only="readOnly"
                placeholder="Phone Number"
              />
            </b-form-group>
          </Vp>
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-select
                id="nested-type"
                v-model="address.type"
                :dense="dense"
                :read-only="readOnly"
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
              placeholder="Name"
            >
              <b-form-input
                id="nested-name"
                v-model="address.name"
                :dense="dense"
                :read-only="readOnly"
              />
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-alt_phone"
                v-model="address.alt_phone"
                placeholder="Alternative Phone Number"
                :read-only="readOnly"
                :dense="dense"
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <!-- //bibag -->
              <b-form-input
                id="nested-city"
                v-model="address.city"
                list="nested-city-list"
                :dense="dense"
                :read-only="readOnly"
                placeholder="City"
              />
              <datalist id="nested-city-list">
                <option
                  v-for="d in shipingChargesTariffs"
                  :key="d.district.name"
                >
                  {{ d.district.name }}
                </option>
                <option
                  v-for="b in shipingChargesTariffs"
                  :key="b.district.bn_name"
                >
                  {{ b.district.bn_name }}
                </option>
              </datalist>
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-area"
                v-model="address.area"
                :dense="dense"
                :read-only="readOnly"
                placeholder="Area"
              />
            </b-form-group>
          </Vp>

          <!-- <Vp
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-country"
                v-model="address.country"
                disabled
                :dense="dense"
                :read-only="readOnly"
              />
            </b-form-group>
          </Vp> -->
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
              :label-cols-lg="labelColLg"
              label-align-sm="right"
            >
              <b-form-textarea
                id="nested-details"
                v-model="address.details"
                :dense="dense"
                :read-only="readOnly"
              />
            </b-form-group>
          </Vp>

          <b-row align-h="end">
            <b-button squared variant="primary" @click="submit">
              Submit
            </b-button>
          </b-row>
        </b-card>
      </Vo>
    </b-overlay>
  </div>
</template>

<script>
import { has, head, lowerCase } from 'lodash'
import { mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import isNotLogin from '../../indernal/isNotLogin'
import phoneConverter from '../../indernal/phoneConverter'
import Locations from '../../indernal/Locations.js'
export default {
  name: 'ShipingAddressCreate',
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  mixins: [isNotLogin],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dense: true,
      labelColLg: '2',
      readOnly: true,
      busyText: 'Please Wait...',
      address: {
        type: 'Home',
        name: this.$isDev('Saiful islam', ''),
        phone: this.$isDev('0171504504', ''),
        alt_phone: '',
        city: this.$isDev('', ''),
        area: this.$isDev('', ''),
        country: 'Bangladesh',
        details: this.$isDev('house no:6 Mohammadpur Housing Society', '')
      },
      fathcedAddress: [],
      busy: false,
      userId: null
      // user Create alert start
    }
  },
  computed: {
    ...mapState('CheckOut', ['shipingChargesTariffs']),
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    'address.phone' (value) {
      const val = phoneConverter(value)
      console.log(val)
      if (val.length === 11) {
        const is = this.$auth.loggedIn
        if (!is) {
          setTimeout(() => {
            this.busy = true
            this.busyText = `...Wait Find address by phone number ${val}`
            this.addressFindByPhone(val)
          }, 1000)
        }
      }
    },
    'address.type' (val) {
      if (val) {
        const v = lowerCase(val)
        const find = this.fathcedAddress.find(a => lowerCase(a.type) === v)
        if (find) {
          this.replaceAddress(find)
        }
      }
    }
  },
  created () {
    if (this.$auth.user) {
      this.userId = this.$auth.user.id
    }
  },
  methods: {
    replaceAddress (address, withoutPhone = false) {
      const {
        type,
        name,
        // eslint-disable-next-line camelcase
        alt_phone,
        city,
        area,
        country,
        details
      } = address
      const phone = withoutPhone ? this.address.phone : address.phone
      const id = has(address, 'id') ? address.id : null
      this.address = {
        id,
        type,
        name,
        phone,
        alt_phone,
        city,
        area,
        country,
        details
      }
      this.$bvToast.toast(`Address replaced on old ${type} Address`, {
        title: 'Address Replace',
        variant: 'primary',
        solid: true
      })
    },
    async addressFindByPhone (phone) {
      try {
        const url = this.$apiUrl('app.findAddressByPhone', { phone }, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        if (data) {
          // data means user
          const addr = data.shipping_address

          if (addr && addr.length) {
            this.replaceAddress(head(addr), true)
            this.fathcedAddress = addr
            this.userId = data.id
          }
        } else {
          this.userId = null
        }
        console.log(data)
        this.busy = false
      } catch (error) {
        console.error(error)
      }
    },
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    params () {
      const add = this.address
      add.phone = phoneConverter(add.phone)

      return add
    },

    async submit () {
      const isValid = await this.$refs.shiping.validate()
      const params = this.params()
      if (!isValid) {
        return false
      }
      try {
        this.busy = true
        this.busyText = '...Wait Create Address'

        const user = this.userId
        if (user && !this.$auth.loggedIn) {
          await this.loginById(this.userId)
        } else if (!this.$auth.loggedIn) {
          await this.doResister(params.phone)
          this.submit()
          return false
        }

        const url = this.$apiUrl(
          'app.user.shipingAddress.store',
          { user },
          false
        )

        const { data } = await this.$axiosWithoutToken.post(url, params)

        this.dialog = false

        this.$emit('done', data)
      } catch (error) {
        this.$formVError({ error, vue: this, ref: 'shiping' })
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>
