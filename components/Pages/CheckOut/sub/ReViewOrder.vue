<template>
  <b-row>
    <b-col cols="12" class="mt-2 p-0">
      <div class="checkout-review-items">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="checkout-review-item"
        >
          <item-card :item="item" />
        </div>
      </div>
    </b-col>
    <b-col cols="12">
      <div class="whole-details">
        <!-- start whole-details-item-->
        <div class="whole-details-item">
          <div class="left-item">
            Products
          </div>
          <div class="right-item">
            {{ numberOfItems }}
          </div>
        </div>
        <!-- start whole-details-item-->
        <div class="whole-details-item">
          <div class="left-item">
            Subtotal
          </div>
          <div class="right-item">
            {{ subTotal }}
          </div>
        </div>
        <!-- start whole-details-item-->
        <div class="whole-details-item">
          <div class="left-item">
            ShipCharge
          </div>
          <div class="right-item">
            {{ shipingCharge }}
          </div>
        </div>
        <!-- start whole-details-item-->
        <div class="whole-details-item">
          <div class="left-item">
            Invoice Bill
          </div>
          <div class="right-item">
            {{ totalPrice }}
          </div>
        </div>
      </div>
    </b-col>
    <b-col
      v-if="chargeObject && chargeObject.note"
      cols="12"
      class="mb-2 d-flex justify-content-center"
    >
      <span class="note-box">
        <div class="left-item"><BIconJournalText /> Note:</div>
        <div class="right-item">
          {{ chargeObject.note }}
        </div>
      </span>
    </b-col>
  </b-row>
</template>

<script>
// import ProductCardHorizontal from '@/components/Organized/ProductCardHorizontal.vue'

import { BIconJournalText } from 'bootstrap-vue'
import ChargeMix from '../indernal/shipingChange'
import ItemCard from './ItemCard.vue'
export default {
  components: {
    ItemCard,

    BIconJournalText
  },
  mixins: [ChargeMix],
  props: {
    items: {
      type: Array,
      required: true
    },
    numberOfItems: {
      type: Number,
      required: true
    },
    sumOfPrices: {
      type: [String, Number],
      required: true
    },
    paymentMethod: {
      type: String,
      default: 'cash'
    }
  },
  data () {
    return {
      shipingCharges: [] /// shipCharge list amountwise
    }
  },
  computed: {
    subTotal () {
      return this.priceWithCode(this.sumOfPrices)
    },
    shipingCharge () {
      const charge = this.sumOfPrices ? this.shipCharge : 0
      return this.priceWithCode(this.shipCharge)
    },
    totalPrice () {
      const shiping = this.sumOfPrices ? this.shipCharge : 0
      const subTotal = this.sumOfPrices
      const total = subTotal + shiping
      return this.priceWithCode(total)
    }
  },

  created () {
    this.fetchCharges()
  },
  methods: {
    priceWithCode (price) {
      const code = window.app.company.currency_code
      return `${price} ${code}`
    }
  }
}
</script>
