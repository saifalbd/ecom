<template>
  <div>
    <b-sidebar v-model="dialog" class="cart-sidebar" right shadow>
      <template #header>
        <b-button
          dark
          variant="outline-danger"
          size="sm"
          @click.stop="dialog = false"
        >
          <BIconXOctagon />
          close
        </b-button>
        <div class="cart-title">
          Carts
        </div>
      </template>
      <div v-show="countCarts" class="cart-sidebar-body">
        <div class="top-toolbar">
          <span> items: {{ countCarts }} </span>
        </div>
        <!-- start cart item list -->
        <div class="cart-item-list">
          <div v-for="item in carts" :key="item.id" class="cart-item">
            <div class="item-card-img-box">
              <b-img
                :src="img(item.images).url"
                :alt="img(item.images).url"
                class="rounded-0"
              />
            </div>
            <div class="item-card-details">
              <b-link
                class="item-card-title"
                :to="{ name: 'products-slug', params: { slug: item.id } }"
              >
                {{ item.name }}
              </b-link>

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
              <div class="bottom-box">
                <div class="item-catd-quantity-adder-box">
                  <quantity-group-adder-with-unit
                    size="sm"
                    input-width="80px"
                    :value="item.cartQuantities"
                    :unit="item.unit"
                    @input="addQuantity(item, $event)"
                  />
                </div>

                <div class="remove-item-box">
                  <b-button
                    dark
                    variant="outline-danger"
                    size="sm"
                    @click.once="removeItem(item)"
                  >
                    <BIconTrashFill />
                  </b-button>
                  <div class="remove-item-tooltip">
                    remove item from cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- end cart item list -->
        <div class="bottom-toolbar">
          <span class="total"> Total Price </span>
          <span class="amount"> {{ totalCartPrices }} {{ currencyCode }} </span>
        </div>
      </div>
      <div v-show="countCarts" class="checkout-box">
        <b-button squared variant="primary" block :to="{ name: 'checkout' }">
          <BIconShopWindow />
          Checkout
        </b-button>
      </div>
      <div v-show="!countCarts">
        <EmtyCart />
      </div>

      <!-- ecommerce carts -->
      <!-- <carts></carts> -->
      <!-- ecommerce sarts end -->
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { head } from 'lodash'
import { BIconShopWindow, BIconTrashFill, BIconXOctagon } from 'bootstrap-vue'
import QuantityGroupAdderWithUnit from '@/components/Pragment/QuantityGroupAdderWithUnit.vue'
import EmtyCart from '@/components/Pragment/EmtyCart.vue'

export default {
  components: {
    QuantityGroupAdderWithUnit,
    EmtyCart,
    BIconShopWindow,
    BIconTrashFill,
    BIconXOctagon
  },
  data () {
    return {
      show: true,
      currencyCode: 'tk'
    }
  },
  computed: {
    ...mapState(['showCart']),
    ...mapState('ShopingCart', ['carts']),
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices']),
    dialog: {
      get () {
        return this.showCart
      },
      set (v) {
        this.$store.dispatch('toggleCart', v)
      }
    }
  },
  created () {
    this.currency_code()
  },
  methods: {
    currency_code () {
      const code = window.app.company.currency_code
      this.currencyCode = code
    },
    ...mapActions('ShopingCart', ['updateQuantity', 'removeItem']),
    img (images) {
      const img = head(images)
      return img
    },
    variantOption (key, optionId) {
      return this.item.available_vartians[key].find(
        item => (item.option_id = optionId)
      ).option
    },
    addQuantity (item, quantity) {
      this.updateQuantity({ id: item.id, quantity })
      item.cartQuantities = quantity
    }
  }
}
</script>
