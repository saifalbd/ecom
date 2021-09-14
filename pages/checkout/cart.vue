<template>
  <div class="accordion checkout-cart" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          variant="info"
          @click.stop="model.review = !model.review"
        >
          Review
        </b-button>
      </b-card-header>
      <b-collapse
        id="accordion-1"
        v-model="model.review"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-card-text>
            <Summary @next="next" />
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card v-show="!isLogin" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block variant="info" @click.stop="model.login = !model.login">
          Login
        </b-button>
      </b-card-header>
      <b-collapse v-model="model.login" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <LoginBox />
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card v-show="isLogin" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          variant="info"
          @click.stop="model.address = !model.address"
        >
          ShipingAddress
        </b-button>
      </b-card-header>
      <b-collapse v-model="model.address" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <ShipingAddress :user="user" />
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card v-show="selectedAddress" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          variant="info"
          @click.stop="model.payments = !model.payments"
        >
          Payments
        </b-button>
      </b-card-header>
      <b-collapse v-model="model.payments" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <Payments />
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import Summary from '@/components/Pages/CheckOut/cart/summary.vue'
import LoginBox from '@/components/Pages/CheckOut/cart/loginBox.vue'
import ShipingAddress from '@/components/Pages/CheckOut/cart/ShipingAddress.vue'
import Payments from '@/components/Pages/CheckOut/cart/Payments.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Summary,
    LoginBox,
    ShipingAddress,
    Payments
  },
  data () {
    return {
      model: {
        review: true,
        login: false,
        address: true,
        payments: true
      }
    }
  },
  computed: {
    ...mapState('CheckOut', ['selectedAddress']),
    ...mapState('auth', ['user', 'loggedIn']),
    isLogin () {
      return !!(this.loggedIn && this.user)
    }
  },
  methods: {
    ...mapActions('CheckOut', ['set_shiping_charge_tariff']),
    next () {}
  },
  // eslint-disable-next-line vue/order-in-components
  mounted () {
    this.set_shiping_charge_tariff()
  }
}
</script>
