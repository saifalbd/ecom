<template>
  <div>
    <b-row class="h-100" no-gutters>
      <b-col cols="12" class="mt-2 mb-2">
        <product-title :title="item.title" class="lg" :slug="item.id" />
      </b-col>
      <b-col cols="12" class="mt-2 mb-2">
        <categories-links size="lg" :categories="item.categories" />
      </b-col>

      <b-col cols="12" class="mt-2 mb-2">
        <p class="p-1">
          {{ item.description }}
        </p>
      </b-col>

      <b-col v-if="hasVariants" cols="12" md="12" class="mt-2 mb-2 p-2">
        <variants-select
          :item="item"
          :variants="item.available_variant_options"
          select-type="radio"
        />
      </b-col>
      <b-col cols="12" md="6" class="mt-2 mb-2 p-2">
        <div>
          <price-tag
            :is-bold="true"
            size="lg"
            :price="item.price.formatted_with_code"
          />
        </div>
      </b-col>
      <b-col cols="12" md="6" class="mt-2 mb-2 p-2">
        <quantity-group-adder
          size="lg"
          input-width="80px"
          :value="item.cartQuantities"
          @input="addQuantity"
        />
      </b-col>
      <b-col cols="12" class="mt-2 mb-2">
        <add-to-cart-button
          :value="item.cartQuantities"
          size="lg"
          :has-on="hasOnCart"
          :item="item"
        >
          {{ hasOnCart ? 'Added' : 'Add to Cart' }}
        </add-to-cart-button>
        <b-button
          v-if="hasOnCart"
          size="lg"
          class="ml-2"
          squared
          variant="outline-danger"
          @click.stop="removeItem(item)"
        >
          <b-icon-trash-fill variant="danger" />
          Remove On Cart
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductTitle from '@/components/Pragment/ProductTitle.vue'
import PriceTag from '@/components/Pragment/PriceTag.vue'
import AddToCartButton from '@/components/Pragment/AddToCartButton.vue'
import QuantityGroupAdder from '@/components/Pragment/QuantityGroupAdder.vue'
import CategoriesLinks from '@/components/Pragment/CategoriesLinks.vue'
import VariantsSelect from '@/components/Pragment/VariantsSelect.vue'

export default {
  components: {
    PriceTag,
    AddToCartButton,
    QuantityGroupAdder,
    CategoriesLinks,
    ProductTitle,
    VariantsSelect
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    hasVariants () {
      return Object.keys(this.item.available_variant_options).length
    },
    hasOnCart () {
      return this.$store.getters['ShopingCart/hasOnCart'](this.item.id)
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['removeItem']),
    addQuantity (num) {
      if (this.item.cartQuantities != num) {
        this.removeItem(this.item)
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.item.cartQuantities = num
    }
  }
}
</script>
