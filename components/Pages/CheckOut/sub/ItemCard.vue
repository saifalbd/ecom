<template>
  <div class="item-card">
    <div class="item-card-img-box">
      <b-img
        :src="img(item.images).url"
        :alt="img(item.images).url"
        class="rounded-0"
      />
    </div>
    <div class="item-card-details">
      <h4 class="item-card-title">
        {{ item.name }}
      </h4>
      <div class="item-card-categories">
        <b-link
          v-for="(c, index) in item.categories"
          :key="index"
          :to="{ name: 'categories-category', params: { category: 1 } }"
        >
          {{ c.title }}
        </b-link>
      </div>
      <div class="item-catd-price">
        <span v-if="item.hasDiscount">
          {{ item.discount.formatted_with_code }}
        </span>
        <span v-else>
          {{ item.price.formatted_with_code }}
        </span>
      </div>
      <div class="item-catd-quantity-adder-box">
        <quantity-group-adder-with-unit
          size="sm"
          :value="item.cartQuantities"
          :unit="item.unit"
          @input="addQuantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isPlainObject, head } from 'lodash'

import { mapActions } from 'vuex'
import QuantityGroupAdderWithUnit from '@/components/Pragment/QuantityGroupAdderWithUnit.vue'

export default {
  components: {
    QuantityGroupAdderWithUnit
  },
  props: {
    item: {
      type: Object,
      required: true,
      validator (v) {
        if (v) {
          if (isPlainObject(v)) {
            return true
          } else {
            console.error('value must be object')
            return false
          }
        } else {
          // return false;
        }
      }
    }
  },
  data () {
    return {
      imageCol: 2
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['updateQuantity']),
    img (images) {
      const img = head(images)
      return img
    },
    variantOption (key, optionId) {
      return this.item.available_vartians[key].find(
        item => (item.option_id = optionId)
      ).option
    },
    addQuantity (quantity) {
      this.updateQuantity({ id: this.item.id, quantity })
      // eslint-disable-next-line vue/no-mutating-props
      this.item.cartQuantities = quantity
    }
  }
}
</script>
