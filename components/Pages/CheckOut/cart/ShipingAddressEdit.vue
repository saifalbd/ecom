<template>
  <div>
    <slot :on="on" />
    <b-modal v-model="model" hide-footer title="Shipping Address Edit">
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
                <b-form-input
                  id="nested-phone"
                  v-model="address.phone"
                  :size="size"
                  :read-only="readOnly"
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
                label-align-sm="right"
              >
                <b-form-select
                  id="nested-type"
                  v-model="address.type"
                  :disabled="true"
                  :size="size"
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
                label-align-sm="right"
              >
                <b-form-input
                  id="nested-name"
                  v-model="address.name"
                  :size="size"
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
                label-align-sm="right"
              >
                <b-form-input
                  id="nested-alt_phone"
                  v-model="address.alt_phone"
                  placeholder="Alternative Phone Number"
                  :read-only="readOnly"
                  :size="size"
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
                <b-form-input
                  id="nested-city"
                  v-model="address.city"
                  :size="size"
                  :read-only="readOnly"
                />
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
                <b-form-input
                  id="nested-area"
                  v-model="address.area"
                  :size="size"
                  :read-only="readOnly"
                />
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
                  :size="size"
                  :read-only="readOnly"
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
                  :size="size"
                  :read-only="readOnly"
                />
              </b-form-group>
            </Vp>

            <b-row align-h="end">
              <b-button squared variant="primary" @click="submit">
                update
              </b-button>
            </b-row>
          </b-card>
        </Vo>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import { has, head, lowerCase } from 'lodash'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import phoneConverter from '../indernal/phoneConverter'
export default {
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  props: {
    editItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      size: 'lg',
      readOnly: true,
      busyText: 'Please Wait...',
      address: {
        type: '',
        name: '',
        phone: '',
        alt_phone: '',
        city: '',
        area: '',
        country: '',
        details: ''
      },
      fathcedAddress: [],
      busy: false,
      model: false
    }
  },

  created () {
    this.replaceAddress(this.editItem)
  },
  methods: {
    on () {
      this.model = !this.model
    },
    replaceAddress (address) {
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
      } = address

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
    },

    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },

    params () {
      const add = this.address
      add.phone = phoneConverter(add.phone)
      return add
    },

    async submit () {
      const isValid = await this.$refs.shiping.validate()
      if (!isValid) {
        return false
      }
      try {
        this.busy = true
        this.busyText = '...Wait Create Address'
        const authUser = this.$auth.user
        if (!authUser) {
          throw new ReferenceError('user are not loggin')
        }
        const user = authUser.id

        const url = this.$apiUrl(
          'app.user.shipingAddress.update',
          {
            shiping_address: this.editItem.id,
            user
          },
          false
        )

        //  await this.wantToResister()

        const { data } = await this.$axiosWithoutToken.patch(url, this.params())

        this.model = false

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
