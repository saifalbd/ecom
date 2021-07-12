<template>
  <div :key="itemId" class="product-card-horizontal">
    <div class="image-col">
      <image-box :images="item.images" :want-love="true" />
    </div>

    <div class="info-col">
      <div class="text-left mb-2">
        <!-- :class="titleClass" -->
        <product-title
          :title="item.name"
          :to="{
            name: 'guest.show',
            params: { slug: item.id },
            query: { name: item.name }
          }"
          :class="titleClass"
        />

        <category-link v-if="showCategory" :category="item.category" />
      </div>

      <div class="card-text text-left mt-0">
        <!-- select Variant start -->
        <b-row no-gutters align-h="start" align-v="start" class="flex-row mb-0">
          <div v-for="(v, key) in item.selected_vartians" :key="key">
            <b-button squared size="sm" variant="light">
              {{ key }}:
              <b-badge variant="primary">
                {{ variantOption(key, v) }}
              </b-badge>
            </b-button>
          </div>
        </b-row>
        <!-- select Variant end -->

        <!-- description start -->
        <!-- <div
                class="description mt-3  d-none d-sm-block"
                :id="`description-toltip-${item.id}`"
                v-if='showCategory'>
                {{item.sort_description}}

            </div> -->
        <!-- description end -->

        <b-row align-h="around" align-v="center">
          <div class="text-left d-sm-none">
            <price-tag
              :is-bold="priceTagBold"
              :size="priceTagSize"
              :price="item.price.formatted_with_code"
            />
          </div>
        </b-row>
      </div>

      <b-container>
        <!--start is siderbar then hide this show in bottom -->
        <b-row class="mb-0 justify-content-around align-content-around">
          <div class="text-left d-none d-sm-block">
            <price-tag
              :is-bold="priceTagBold"
              :size="priceTagSize"
              :price="item.price.formatted_with_code"
            />
          </div>

          <div v-if="quantityAdderShow">
            <slot name="quantity-group-adder">
              <!-- <quantity-group-adder
                   :showPlusMinus="showPlusMinus"
                        :size="quantityAdderSize"
                        :quantityAdderWidth="quantityAdderWidth"
                        :value="item.cartQuantities"
                        @input="addQuantityOnCart"
               >
                    </quantity-group-adder> -->
              <quantity-group-adder-with-unit
                :show-plus-minus="showPlusMinus"
                :size="quantityAdderSize"
                :quantity-adder-width="quantityAdderWidth"
                :value="item.cartQuantities"
                :unit="item.unit"
                @input="addQuantityOnCart"
              />
            </slot>
          </div>

          <add-to-cart-button
            v-if="cartButtonShow"
            :value="item.cartQuantities"
            :size="cartButtonSize"
            :has-on="hasOnCart"
            :item="item"
          >
            {{ hasOnCart ? 'Added' : 'Add to Cart' }}
          </add-to-cart-button>

          <b-button
            v-if="removeButtonShow && hasOnCart"
            :size="removeButtonSize"
            variant="light"
            @click.stop="removeCart"
          >
            <BIconTrashFill variant="danger" />
          </b-button>
        </b-row>
        <!--start is siderbar then hide this show in bottom -->
      </b-container>
    </div>

    <b-tooltip
      :target="`description-toltip-${item.id}`"
      variant="info"
      placement="bottom"
    >
      {{ item.description }}
    </b-tooltip>
  </div>
</template>

<script>
import { BIconTrashFill } from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { isPlainObject } from 'lodash'
import ImageBox from '../Pragment/ImageBox.vue'
import PriceTag from '../Pragment/PriceTag.vue'
import AddToCartButton from '../Pragment/AddToCartButton.vue'
import CategoryLink from '../Pragment/CategoryLink.vue'
import ProductTitle from '../Pragment/ProductTitle.vue'
import QuantityGroupAdderWithUnit from '../Pragment/QuantityGroupAdderWithUnit.vue'

export default {
  components: {
    ImageBox,
    PriceTag,
    AddToCartButton,
    BIconTrashFill,

    QuantityGroupAdderWithUnit,
    CategoryLink,
    ProductTitle
  },

  props: {
    itemId: {
      type: Number,
      required: true
    },
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
    },
    forCart: {
      type: Boolean,
      default: true
    },
    imageCol: {
      type: Number,
      default: 3
    },
    isSideBar: {
      type: Boolean,
      default: false
    },
    showCategory: {
      type: Boolean,
      default: true
    },
    // price
    priceTagSize: {
      type: String,
      default: 'normal'
    },
    priceTagBold: {
      type: Boolean,
      default: true
    },
    // quantity
    quantityAdderSize: {
      type: String,
      default: 'normal'
    },
    quantityAdderShow: {
      type: Boolean,
      default: true
    },
    quantityAdderWidth: {
      type: String,
      default: 'auto'
    },
    // cartButton
    cartButtonShow: {
      type: Boolean,
      default: true
    },
    cartButtonSize: {
      type: String,
      default: 'normal'
    },
    // remove button
    removeButtonShow: {
      type: Boolean,
      default: false
    },
    removeButtonSize: {
      type: String,
      default: 'normal'
    },
    titleClass: {
      type: String,
      default: ''
    },
    showPlusMinus: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    hasOnCart () {
      return this.$store.getters['ShopingCart/hasOnCart'](this.item.id)
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['removeItem', 'updateQuantity']),
    img (images) {
      const img = _.head(images)
      return img
    },
    removeCart () {
      this.removeItem(this.item)
    },
    variantOption (key, optionId) {
      return this.item.available_vartians[key].find(
        item => (item.option_id = optionId)
      ).option
    },
    addQuantityOnCart (quantity) {

      this.updateQuantity({ id: this.itemId, quantity })

      //    this.item.cartQuantities = quantity;
    }
  }
}
</script>
