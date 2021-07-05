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
      <b-col
        cols="12"
        md="6"
        :offset-md="hasOnCart ? 0 : 3"
        class="mt-2 mb-2 p-2 "
      >
        <div>
          <price-tag
            :is-bold="true"
            size="lg"
            :price="item.price.formatted_with_code"
          />
        </div>
      </b-col>
      <b-col
        v-if="hasOnCart == true"
        cols="12"
        md="6"
        class="mt-2 mb-2 p-2 d-flex justify-content-center"
      >
        <!-- <quantity-group-adder
          size="lg"
          input-width="80px"
          :value="item.cartQuantities"
          @input="addQuantity"
        /> -->
        <quantity-group-adder-with-unit
          size="lg"
          input-width="80px"
          :value="item.cartQuantities"
          :unit="item.unit"
          @input="addQuantity(item, $event)"
        />
      </b-col>
      <b-col cols="12" class="mt-2 mb-2 d-flex justify-content-center">
        <add-to-cart-button
          :value="item.cartQuantities"
          size="lg"
          :has-on="hasOnCart"
          :item="item"
        >
          {{ hasOnCart ? 'Go to Shiping' : 'Add to Cart' }}
        </add-to-cart-button>
        <b-button
          v-if="hasOnCart"
          size="lg"
          class="ml-2"
          squared
          variant="outline-danger"
          @click.stop="removeItem(item)"
        >
          <b-icon-trash-fill />
          Remove On Cart
        </b-button>
      </b-col>
      <b-col cols="12" class="mt-2 mb-2 p-2">
        <label for="rating-10">Rating with 5 stars:</label>
        <b-form-rating
          id="rating-10"
          v-model="rate"
          :readonly="rateReadOnly"
          color="indigo"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductTitle from '@/components/Pragment/ProductTitle.vue'
import PriceTag from '@/components/Pragment/PriceTag.vue'
import AddToCartButton from '@/components/Pragment/AddToCartButton.vue'
// import QuantityGroupAdder from '@/components/Pragment/QuantityGroupAdder.vue'
import CategoriesLinks from '@/components/Pragment/CategoriesLinks.vue'
import VariantsSelect from '@/components/Pragment/VariantsSelect.vue'
import QuantityGroupAdderWithUnit from '@/components/Pragment/QuantityGroupAdderWithUnit.vue'
import { BIconTrashFill } from 'bootstrap-vue'

export default {
  components: {
    BIconTrashFill,
    PriceTag,
    AddToCartButton,
    // QuantityGroupAdder,
    CategoriesLinks,
    ProductTitle,
    VariantsSelect,
    QuantityGroupAdderWithUnit
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rate: null,
      rateReadOnly: false
    }
  },
  computed: {
    hasVariants () {
      return Object.keys(this.item.available_variant_options).length
    },
    hasOnCart () {
      return this.$store.getters['ShopingCart/hasOnCart'](this.item.id)
    }
  },
  watch: {
    rate (val) {
      this.storeRate(val)
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['updateQuantity', 'removeItem']),

    // addQuantity (num) {
    //   if (this.item.cartQuantities !== num) {
    //     this.removeItem(this.item)
    //   }
    //   // eslint-disable-next-line vue/no-mutating-props
    //   this.item.cartQuantities = num
    // },
    addQuantity (item, quantity) {
      this.updateQuantity({ id: item.id, quantity })
      item.cartQuantities = quantity
    },
    async storeRate (rate) {
      try {
        this.rateReadOnly = true
        const item = this.$route.params.slug
        const url = this.$apiUrl('app.item.rating.store', { item }, false)
        const body = this.text
        const { data } = await this.$axios.post(url, { rate })
        this.$emit('rating', data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
