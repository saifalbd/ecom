<template>
  <b-row class="checkout">
    <b-col cols="12">
      <b-overlay :show="busy">
        <b-row>
          <b-col cols="12" class="text-left review-title">
            Review selected items
          </b-col>
          <b-col cols="12">
            <re-view-order
              :number-of-items="numberOfItems()"
              :sum-of-prices="sumOfPrices()"
              :items="carts"
              :payment-method="paymentMethod"
              @back="tabIndex = 0"
            />
          </b-col>

          <b-col cols="12" class="text-left review-title">
            Review shiping Address
          </b-col>
          <b-col cols="12">
            <shiping-details
              :with-register.sync="withRegister"
              :payment-method.sync="paymentMethod"
              :selected-address.sync="selectedAddress"
              :shiping-addresses="shipingAddresses"
              :show-bkash-dialog.sync="bkashDialog"
              :payment-options="paymentOptions"
              @createdUser="createdUser = $event"
              @next="shippingFillup"
              @payment-close="paymentDailogOnClose"
              @payment-done="paymentDone"
            />
          </b-col>
        </b-row>
        <!-- <b-card no-body>
           </b-card> -->
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import { head } from 'lodash'
import { mapActions } from 'vuex'
import ReViewOrder from './sub/ReViewOrder.vue'
import ShipingDetails from './sub/ShipingDetails.vue'
import checkoutApi from './indernal/checkoutApi'
import forSubmit from './indernal/forSubmit'
import paymentCreate from './indernal/paymentCreate'

export default {
  components: {
    ShipingDetails,
    ReViewOrder
  },
  mixins: [checkoutApi, paymentCreate, forSubmit],
  data () {
    return {
      tabIndex: 0,
      shipingAddresses: [],
      paymentOptions: [],
      selectedAddress: null,
      paymentMethod: 'cash',
      busy: false,
      withRegister: false,
      createdUser: null
    }
  },
  watch: {
    selectedAddress (val) {
      const add = this.shipingAddresses.find(item => item.id === val)
      if (!add) {
        alert('selected tarif not found')
      }
      this.set_selected_tariff(add.city)
    }
  },

  created () {
    this.$store.dispatch('toggleCart', false)
    this.isLogin()
    this.fetchPaymentOptions()
    this.set_shiping_charge_tariff()
  },

  methods: {
    ...mapActions('CheckOut', [
      'set_shiping_charge_tariff',
      'set_selected_tariff'
    ]),
    shippingFillup () {
      this.submit()
    },
    async fetchPaymentOptions () {
      try {
        const url = this.$apiUrl('app.paymentOptions', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.paymentOptions = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchShipingAddresses (user) {
      try {
        this.busy = true
        const url = this.$apiUrl(
          'app.user.shipingAddress.index',
          { user },
          false
        )
        const { data } = await this.$authAxios(this.$auth).get(url)

        this.selectedAddress = head(data) ? head(data).id : null
        this.shipingAddresses = data

        Promise.resolve({ data })
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    },
    wantToLogin () {
      this.$router.push({ name: 'Login' })
    },
    notWantToLogin () {
      this.withRegister = true
    },

    isLogin () {
      const is = this.$auth.loggedIn

      if (is) {
        const userId = this.$auth.user.id

        this.fetchShipingAddresses(userId)
      } else {
        this.notWantToLogin()
        // this.confirmModel();
      }
    }
  }
}
</script>
