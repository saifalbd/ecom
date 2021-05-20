<template>
  <b-card bg-variant="light" border-variant="light">
    <b-form-group v-slot="{ ariaDescribedby }" size="lg">
      <b-row v-for="address in shipingAddresses" :key="address.id">
        <b-col cols="4">
          <b-form-radio
            v-model="selectedItem"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="address.id"
          >
            {{ address.type }}
          </b-form-radio>
        </b-col>

        <b-col cols="4">
          <div>Name: {{ address.name }}</div>
          <div>Name: {{ address.phone }}</div>
          <div v-if="address.alt_phone">
            Alternative Phone: {{ address.alt_phone }}
          </div>
          <div>
            {{ address.details }}
          </div>
          <div>{{ address.city }},{{ address.country }},</div>
        </b-col>
        <b-col cols="4">
          <edit-item :item="address" @done="addOrEdit">
            <template #default="{ on }">
              <b-button
                variant="outline-primary"
                size="sm"
                class="m-1"
                @click="on"
              >
                Edit
              </b-button>
            </template>
          </edit-item>

          <b-button variant="outline-danger" size="sm" @click="remove(address)">
            Delete
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-button variant="outline-primary" size="sm" @click="add = true">
          Add New Address
        </b-button>
      </b-row>
    </b-form-group>
    <b-row>
      <b-col cols="12">
        <hr>
      </b-col>
      <b-col cols="12">
        <payment-methods v-model="paymentMethodName" />
      </b-col>
    </b-row>

    <b-row align-h="end">
      <b-button squared variant="primary" @click="next">
        APPLY
      </b-button>
    </b-row>
    <shiping-address-model
      v-model="add"
      :with-register="withRegister"
      @createdUser="$emit('createdUser', $event)"
      @done="addOrEdit"
    />
  </b-card>
</template>

<script>
import { head } from 'lodash'
import ShipingAddressModel from './spDetails/ShipingAddressModel.vue'
import EditItem from './spDetails/EditItem.vue'
import PaymentMethods from './spDetails/PaymentMethods.vue'
export default {
  name: 'ShipingDetails',
  components: {
    ShipingAddressModel,
    EditItem,
    PaymentMethods
  },
  props: {
    shipingAddresses: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    selectedAddress: {
      type: Number
    },
    paymentMethod: {
      type: String,
      required: true
    },
    withRegister: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      selectedItem: 1,
      add: false,

      busy: false
    }
  },
  computed: {
    paymentMethodName: {
      get () {
        return this.paymentMethod
      },
      set (val) {
        this.$emit('update:paymentMethod', val)
      }
    }
  },
  watch: {
    selectedItem (val) {
      this.$emit('update:selectedAddress', val)
    },
    selectedAddress (val) {
      this.selectedItem = val
    }
  },
  created () {},
  methods: {
    async submit () {
      try {
        this.busy = true
        const url = this.$apiUrl('app.shipingAddress.store', {}, false)
        await this.$http.axios.post(url, this.address)
      } catch (error) {
        console.error(error)
        return error
      }
    },

    addOrEdit (item) {
      const index = this.shipingAddresses.findIndex(el => el.id == item.id)
      if (index > -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.shipingAddresses.splice(index, 1, item)
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.shipingAddresses.push(item)
      }
      this.$emit('update:withRegister', false)
      this.$emit('update:selectedAddress', item.id)
    },
    remove (item) {
      if (this.shipingAddresses.length < 2) {
        return false
      }
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete ${item.type} address`,
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(async (value) => {
          if (value) {
            const index = this.shipingAddresses.findIndex(
              el => el.id == item.id
            )
            if (index > -1) {
              try {
                const url = this.$apiUrl(
                  'app.shipingAddress.destroy',
                  {
                    shiping_address: item.id
                  },
                  false
                )
                // eslint-disable-next-line no-unused-vars
                const { data } = await this.$http.axios.delete(url)
                // eslint-disable-next-line vue/no-mutating-props
                this.shipingAddresses.splice(index, 1)
                this.selectedItem = head(this.shipingAddresses)
                  ? head(this.shipingAddresses).id
                  : null
              } catch (error) {
                console.error(error)
              }
            }
          }
        })
    },

    addressNotSelectError () {
      this.$bvModal.msgBoxOk(
        'Shiping Address Not Selected Please Select address or Create new Address first then submit order',
        {
          title: 'Address Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }
      )
    },
    next () {
      const isValid = this.selectedAddress
      if (!isValid) {
        this.addressNotSelectError()
        return false
      }

      this.$emit('next', true)
    }
  }
}
</script>
