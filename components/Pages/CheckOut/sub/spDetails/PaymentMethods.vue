<template>
  <b-form-radio-group v-model="paymentMethod" size="lg" name="radio-options">
    <b-row align-h="center">
      <b-col cols="auto">
        <a
          class="pay-button"
          :class="{ active: paymentMethod == 'cash' }"
          @click.stop="paymentMethod = 'cash'"
        >
          <b-form-radio size="lg" value="cash" />
          <img src="@/assets/payment-icons/cash.svg" class="img-fluid" alt="">
          Cash On Delivery
        </a>
      </b-col>
      <b-col v-show="is('bkash')" cols="auto">
        <a
          class="pay-button"
          :class="{ active: paymentMethod == 'bkash' }"
          @click.stop="paymentMethod = 'bkash'"
        >
          <b-form-radio size="lg" name="s" value="bkash" />
          <img
            src="@/assets/payment-icons/bkash.png"
            class="img-fluid"
            alt=""
          >
        </a>
      </b-col>
      <b-col v-show="is('nagad')" cols="auto">
        <a
          class="pay-button"
          :class="{ active: paymentMethod == 'nagad' }"
          @click.stop="paymentMethod = 'nagad'"
        >
          <b-form-radio size="lg" name="s" value="nagad" />
          <img
            src="@/assets/payment-icons/nagad.png"
            class="img-fluid"
            alt=""
          >
        </a>
      </b-col>
      <b-col v-show="is('international')" cols="auto">
        <a
          class="pay-button"
          :class="{ active: paymentMethod == 'international' }"
          @click.stop="paymentMethod = 'international'"
        >
          <b-form-radio size="lg" name="s" value="international" />
          <div class="image-group">
            <img
              src="@/assets/payment-icons/mastercard.svg"
              class="img-fluid"
              alt=""
            >
            <img
              src="@/assets/payment-icons/visa.svg"
              class="img-fluid"
              alt=""
            >
            <img
              src="@/assets/payment-icons/vpay.svg"
              class="img-fluid"
              alt=""
            >
          </div>
        </a>
      </b-col>
    </b-row>
  </b-form-radio-group>
</template>

<script>
import { lowerCase } from 'lodash'
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    // paymentMethod options with active inactiv come from server
    paymentOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    paymentMethod: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    is (method) {
      return (
        this.paymentOptions.findIndex((item) => {
          return (
            lowerCase(item.method) === lowerCase(method) &&
            parseInt(item.active)
          )
        }) > -1
      )
    }
  }
}
</script>
