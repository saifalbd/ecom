<template>
  <div class="payments">
    <div class="accordion" role="tablist">
      <!-- card start -->
      <b-card no-body class="mb-1">
        <b-card-header
          header-tag="header"
          header-class="p-0"
          class="p-1"
          role="tab"
        >
          <div class="title-bar" @click.stop="model = 1">
            <div class="left">
              <img :src="images.cash" class="img-fluid" alt="">
              <span>
                Cash on Delivery
              </span>
            </div>
            <div class="right">
              <BIconArrowDown v-if="model == 1" font-scale="2" />
              <BIconArrowRight v-else font-scale="2" />
            </div>
          </div>
        </b-card-header>
        <b-collapse :visible="model == 1" role="tabpanel">
          <b-card-body>
            <b-card-text class="text-center">
              <b-button size="lg" @click.stop="submit">
                CheckOut
              </b-button>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!-- card end -->
      <!-- card start -->
      <b-card no-body class="mb-1">
        <b-card-header
          header-tag="header"
          header-class="p-0"
          class="p-1"
          role="tab"
        >
          <div class="title-bar" @click.stop="model = 2">
            <div class="left">
              <img :src="images.bkash" class="img-fluid" alt="">
              <span>
                Bkash
              </span>
            </div>
            <div class="right">
              <BIconArrowDown v-if="model == 2" font-scale="2" />
              <BIconArrowRight v-else font-scale="2" />
            </div>
          </div>
        </b-card-header>
        <b-collapse :visible="model == 2" role="tabpanel">
          <b-card-body>
            <b-card-text class="text-center">
              <b-button variant="primary" size="lg" @click="bkashDialog = true">
                PAY
              </b-button>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!-- card end -->
      <!-- card start -->
      <b-card no-body class="mb-1">
        <b-card-header
          header-tag="header"
          header-class="p-0"
          class="p-1"
          role="tab"
        >
          <div class="title-bar" @click.stop="model = 3">
            <div class="left">
              <img :src="images.nagad" class="img-fluid" alt="">
              <span>
                Nagad
              </span>
            </div>
            <div class="right">
              <BIconArrowDown v-if="model == 3" font-scale="2" />
              <BIconArrowRight v-else font-scale="2" />
            </div>
          </div>
        </b-card-header>
        <b-collapse :visible="model == 3" role="tabpanel">
          <b-card-body>
            <b-card-text class="text-center">
              <b-button variant="primary" size="lg" @click="nagadDialog = true">
                PAY
              </b-button>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!-- card end -->
      <BkashPayment
        v-if="bkashOption"
        v-model="bkashDialog"
        :option="bkashOption"
        title="Bkash Payment"
        @close="paymentClose"
        @done="paymentDone"
      />
      <BkashPayment
        v-if="nagadOption"
        v-model="nagadDialog"
        :option="nagadOption"
        title="Nagad Payment"
        @close="paymentClose"
        @done="paymentDone"
      />
    </div>
  </div>
</template>

<script>
import { BIconArrowDown, BIconArrowRight } from 'bootstrap-vue'
import nagad from '@/assets/payment-icons/nagad.png'
import cash from '@/assets/payment-icons/cash.svg'
import paypal from '@/assets/payment-icons/paypal.svg'
import mastercard from '@/assets/payment-icons/mastercard.svg'
import bkash from '@/assets/payment-icons/bkash.png'
import { sumBy } from 'lodash'
import { mapActions, mapState } from 'vuex'
import BkashPayment from './Sub/bkash.vue'

export default {
  name: 'CartPayment',
  components: {
    BIconArrowDown,
    BIconArrowRight,
    BkashPayment
  },
  data () {
    return {
      model: 1,
      images: { nagad, bkash, cash, paypal, mastercard },
      bkashDialog: false,
      nagadDialog: false,
      paymentOptions: []
    }
  },
  computed: {
    bkashOption () {
      return this.paymentOptions
        .filter(e => e.active)
        .find(e => e.method === 'bkash')
    },
    nagadOption () {
      return this.paymentOptions
        .filter(e => e.active)
        .find(e => e.method === 'nagad')
    },
    // --------------------checkout------
    paymentMethod () {
      if (this.model === 1) {
        return 'cash'
      } else if (this.model === 2) {
        return 'bkash'
      } else if (this.model === 3) {
        return 'nagad'
      } else {
        return undefined
      }
    },
    ...mapState('ShopingCart', ['carts']),
    ...mapState('CheckOut', ['selectedAddress', 'createdUser'])
  },
  created () {
    this.fetchPaymentOptions()
  },
  methods: {
    paymentClose () {
      this.model = 1
    },
    paymentDone () {
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
    ...mapActions('ShopingCart', ['removeAll']),
    makeSenditems () {
      const items = this.carts
      // eslint-disable-next-line camelcase
      const item_list = items.map((item) => {
        const id = item.id
        const quatities = item.cartQuantities
        const price = item.price.raw
        // eslint-disable-next-line camelcase
        const selected_vartians = item.selected_vartians
        return { id, quatities, price, selected_vartians }
      })
      const totalPrice = sumBy(item_list, 'price')
      // eslint-disable-next-line camelcase
      const address_id = this.selectedAddress
      // eslint-disable-next-line camelcase
      const payment_method = this.paymentMethod
      return { item_list, totalPrice, address_id, payment_method }
    },
    async submit () {
      this.busy = true
      try {
        const params = this.makeSenditems()
        const url = this.$apiUrl('app.orderPlace.store', {}, false)
        const { data } = await this.$authAxios(this.$auth).post(url, params)

        this.removeAll()
        const query = { order_id: data.order_id }
        if (this.createdUser) {
          query.userName = this.createdUser.userName
          query.password = this.createdUser.password
        }

        this.$router.push({ name: 'thankyou', query })
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
