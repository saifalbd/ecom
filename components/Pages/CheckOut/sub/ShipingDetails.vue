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
          <ShipingAddressEdit :edit-item="address" @done="addOrEdit">
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
          </ShipingAddressEdit>

          <b-button variant="outline-danger" size="sm" @click="remove(address)">
            Delete
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-button
          v-if="selectedAddress"
          variant="outline-primary"
          size="sm"
          @click="add = true"
        >
          Add New Address
        </b-button>
        <b-col v-else cols="12" md="12" lg="10" offset-lg="1">
          <ShipingAddressCreate
            :with-register="withRegister"
            @createdUser="$emit('createdUser', $event)"
            @done="addOrEdit"
          />
        </b-col>
      </b-row>
    </b-form-group>
    <b-row>
      <b-col cols="12">
        <hr>
      </b-col>
      <b-col cols="12">
        <b-overlay
          opacity="0.5"
          bg-color="#150235"
          :show="selectedAddress ? false : true"
          rounded="sm"
        >
          <template #overlay>
            <div class="text-center  text-light rounded">
              Please Select Address First
            </div>
          </template>
          <payment-methods v-model="paymentMethodName" />
        </b-overlay>
      </b-col>
    </b-row>

    <b-row align-h="end" class="mt-4 pt-4">
      <button class="submit-button" @click.once="next">
        APPLY
      </button>
    </b-row>
    <shiping-address-model
      v-model="add"
      @createdUser="$emit('createdUser', $event)"
      @done="addOrEdit"
    />
    <!-- <Bkash
      v-model="bkashDialog"
      @close="$emit('payment-close', true)"
      @done="$emit('payment-done', $event)"
    /> -->
  </b-card>
</template>

<script>
import { head, lowerCase } from 'lodash'
import ShipingAddressModel from './spDetails/ShipingAddressModel.vue'
import ShipingAddressCreate from './spDetails/ShipingAddressCreate.vue'
import ShipingAddressEdit from './spDetails/ShipingAddressEdit.vue'
import PaymentMethods from './spDetails/PaymentMethods.vue'
import Bkash from './payments/bkash.vue'
export default {
  name: 'ShipingDetails',
  components: {
    ShipingAddressModel,
    ShipingAddressEdit,
    PaymentMethods,
    ShipingAddressCreate,
    Bkash
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
    showBkashDialog: {
      type: Boolean,
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

      nagadDialog: false,

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
    },
    bkashDialog: {
      get () {
        return this.showBkashDialog
      },
      set (val) {
        this.$emit('update:showBkashDialog', val)
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
    addOrEdit (item) {
      const index = this.shipingAddresses.findIndex((el) => {
        return (
          parseInt(el.id) === parseInt(item.id) ||
          lowerCase(el.type) === lowerCase(item.type)
        )
      })
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
              el => parseInt(el.id) === parseInt(item.id)
            )
            if (index > -1) {
              try {
                const user = this.$auth.user.id
                if (!user) {
                  throw new ReferenceError('user not logged')
                }
                const url = this.$apiUrl(
                  'app.user.shipingAddress.destroy',
                  {
                    shiping_address: item.id,
                    user
                  },
                  false
                )
                // eslint-disable-next-line no-unused-vars
                const { data } = await this.$axiosWithoutToken.delete(url)
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
