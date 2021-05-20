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
              @createdUser="createdUser = $event"
              @next="shippingFillup"
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
import ReViewOrder from './sub/ReViewOrder.vue'
import ShipingDetails from './sub/ShipingDetails.vue'
import checkoutApi from './indernal/checkoutApi'
import forSubmit from './indernal/forSubmit'

export default {
  components: {
    ShipingDetails,
    ReViewOrder
  },
  mixins: [checkoutApi, forSubmit],
  data () {
    return {
      tabIndex: 0,
      shipingAddresses: [],
      selectedAddress: null,
      paymentMethod: 'cash',
      busy: false,
      withRegister: false,
      createdUser: null
    }
  },

  created () {
    this.$store.dispatch('toggleCart', false)
    this.isLogin()
  },

  methods: {
    shippingFillup () {
      this.submit()
    },
    async fetchShipingAddresses () {
      try {
        this.busy = true
        const url = this.$apiUrl('app.shipingAddress.index', {}, false)
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
        this.fetchShipingAddresses()
      } else {
        this.notWantToLogin()
        // this.confirmModel();
      }
    }
  }
}
</script>
