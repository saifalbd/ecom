<template>
  <b-overlay :show="busy">
    <div
      class="row order-single"
      :style="`background-image: url('${polyline}')`"
    >
      <b-col cols="12" class="h4">
        <div>
          <span>Order ID : </span>
          <b-link
            :to="{
              name: 'dashboard-orders-order',
              params: { order: order.order_id }
            }"
            class="order_id"
          >
            {{ order.order_id }}
          </b-link>
        </div>
        <div class="h5">
          Items 8 {{ statusVariant }}
        </div>
      </b-col>
      <b-col cols="12">
        <b-button-group size="sm">
          <b-button
            :variant="statusVariant"
            class="m-1"
            @click.stop="cancel(order.status)"
          >
            {{ order.status.title }}
          </b-button>
        </b-button-group>
      </b-col>
      <b-col
        v-for="item in order.order_products"
        :key="item.name"
        cols="6"
        sm="4"
        md="3"
      >
        <div class="card h-100">
          <image-box :images="item.images" />

          <div class="card-body">
            <div class="item-name">
              {{ item.title }}
            </div>
            <small>
              <strong>
                Quantity:
              </strong>
              {{ item.quantity }}
            </small>

            <h5 class="card-title">
              <price-tag :price="price(item.amount)" />
            </h5>
          </div>
        </div>
      </b-col>
    </div>
  </b-overlay>
</template>

<script>
import polyline from '@/assets/order-poly-line.png'
import PriceTag from '@/components/Pragment/PriceTag.vue'
import ImageBox from '@/components/Pragment/ImageBox.vue'

import Status from './internal/status'
export default {
  name: 'Order',
  components: {
    PriceTag,
    ImageBox
  },
  mixins: [Status],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    order: {
      type: Object,
      requred: true
    },
    // eslint-disable-next-line vue/require-default-prop
    orderStatusList: {
      type: Array,
      requred: true
    }
  },
  data () {
    return {
      polyline,
      busy: false
    }
  },
  computed: {},
  created () {
    // console.log(this.statusIs())
  },
  methods: {
    price (amount) {
      return amount + ' ' + window.app.company.currency_code
    }
    // ------------- status is---

    // ---------------- end status is---
  }
}
</script>
