<template>
  <div class="summary">
    <table>
      <thead>
        <tr>
          <th>image</th>
          <th>product</th>
          <th>price</th>
          <th>quantity</th>
          <th>total</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in carts" :key="index">
          <td class="p-1">
            <b-img
              thumbnail
              fluid
              v-bind="imgProps"
              :src="img(item.images).url"
              :alt="img(item.images).url"
            />
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.price.formatted_with_symbol }}
          </td>
          <td>
            <div style="max-width:150px">
              <quantity-group-adder-with-unit
                size="sm"
                input-width="80px"
                :value="item.cartQuantities"
                :unit="item.unit"
                @input="addQuantity(item, $event)"
              />
            </div>
          </td>
          <td>
            {{ item.cartQuantities * item.price.raw }}
          </td>
          <td>
            <b-button
              dark
              variant="outline-danger"
              size="sm"
              @click.stop="removeItem(item)"
            >
              <BIconTrashFill />
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="downboard">
      <div class="calculate-shiping">
        <div class="title">
          Calculate Shipping
        </div>
        <div class="cal-gorup">
          <label for=""> City {{ district }} </label>
          <select v-model="district">
            <option :value="null">
              Select District
            </option>
            <option
              v-for="op in shipingChargesTariffs"
              :key="op.district.id"
              :value="op.district.id"
            >
              {{ op.district.name }}
            </option>
          </select>
        </div>
        <div class="cal-gorup">
          <label for="">
            Payment Method
          </label>
          <select v-model="paymentMethodType">
            <option value="cash_on_hand">
              Cash On Hand
            </option>
            <option value="prepaid">
              Prepaid
            </option>
          </select>
        </div>
        <div class="cal-gorup">
          <label for="">
            Copune Code
          </label>
          <input>
        </div>
        <div class="cal-gorup">
          <button>
            Apply
          </button>
        </div>
      </div>
      <div class="cart-summary">
        <div>
          <div class="title">
            Cart Summary
          </div>
          <ul class="details">
            <li>
              Sub Total
            </li>
            <li>
              {{ totalCartPrices }}
            </li>
            <li>
              Shipping Cost
            </li>
            <li>
              {{ charge }}
            </li>
            <div class="devider" />
            <li class="bold">
              item
            </li>
            <li class="bold">
              854
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-right mt-3">
      <button class="next-btn" @click.stop="$emit('next', true)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import QuantityGroupAdderWithUnit from '@/components/Pragment/QuantityGroupAdderWithUnit.vue'
import { BIconTrashFill } from 'bootstrap-vue'
import { head } from 'lodash'
export default {
  name: 'CartSummary',
  components: {
    BIconTrashFill,
    QuantityGroupAdderWithUnit
  },
  data () {
    return {
      imgProps: { blank: false, blankColor: '#777', width: 100, height: 100 },
      district: null
    }
  },
  computed: {
    ...mapState('CheckOut', ['shipingChargesTariffs', 'paymentType']),
    ...mapGetters('CheckOut', ['charge']),
    ...mapState('ShopingCart', ['carts']),
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices']),
    paymentMethodType: {
      get () {
        return this.paymentType
      },
      set (val) {
        this.set_payment_type(val)
      }
    }
  },
  watch: {
    district (val) {
      if (val) {
        const s = this.shipingChargesTariffs.find(a => a.district.id === val)
        this.set_selected_tariff(s.district.name)
      }
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['updateQuantity', 'removeItem']),
    ...mapActions('CheckOut', ['set_selected_tariff', 'set_payment_type']),
    img (images) {
      const img = head(images)
      return img
    },
    items () {
      return this.carts
    },
    numberOfItems () {
      return this.countCarts
    },
    sumOfPrices () {
      return this.totalCartPrices
    },
    addQuantity (item, quantity) {
      this.updateQuantity({ id: item.id, quantity })
      item.cartQuantities = quantity
    }
  }
}
</script>
