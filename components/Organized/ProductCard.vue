<template>
  <div class="product-card card h-100" :class="hasClass">
    <div v-show="item.hasDiscount" class="off-status">
      {{ item.off }}
    </div>
    <image-box
      v-if="item.images"
      :class="imgClass"
      :images="item.images"
      :want-love="true"
      :is-hover="true"
    >
      <b-button
        squared
        :to="{ name: 'products-slug', params: { slug: item.id } }"
      >
        show details
      </b-button>
    </image-box>
    <!-- <img class="card-img" :src="img(item.images).url" :alt="img(item.images).url"> -->
    <!-- card-img-overlay  -->
    <div class="d-flex justify-content-end">
      <a href="#" class="card-link text-danger like">
        <i class="fas fa-heart" />
      </a>
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <product-title :title="item.title" :slug="item.id" />

        <categories-links v-if="showCategory" :categories="item.categories" />
        <!-- <h6 class="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6> -->
        <!-- <p class="card-text mt-1">
          {{ str_take(item.description) }}
        </p> -->
        <client-only>
          <variants-select
            v-if="item.available_vartians"
            :item="item"
            :variants="item.available_vartians"
            select-type="radio"
          />
        </client-only>
      </div>

      <div class="buy">
        <div class="price text-success">
          <span v-if="item.hasDiscount" class="amount">
            {{ item.discount.formatted_with_symbol }}
            <i>
              {{ item.price.formatted_with_symbol }}
              <div class="close-line" />
            </i>
          </span>

          <span v-else class="amount">
            {{ item.price.formatted_with_symbol }}
          </span>

          <small class="unit">
            Per
            {{ item.unit.title }}
          </small>
        </div>
        <client-only>
          <add-to-cart-button
            :value="item.cartQuantities"
            :has-on="hasOnCart"
            :item="item"
            fill-width
            @input="addQuantityOnCart"
          >
            {{ hasOnCart ? 'Checkout' : 'Add' }}
          </add-to-cart-button>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import { isPlainObject, hasIn, head } from 'lodash'
import VariantsSelect from '../Pragment/VariantsSelect.vue'
import AddToCartButton from '../Pragment/AddToCartButton.vue'
import CategoriesLinks from '../Pragment/CategoriesLinks.vue'
import ProductTitle from '../Pragment/ProductTitle.vue'
import ImageBox from '../Pragment/ImageBox.vue'

export default {
  components: {
    VariantsSelect,
    AddToCartButton,
    CategoriesLinks,
    ProductTitle,
    ImageBox
  },
  props: {
    showCategory: {
      type: Boolean,
      default: true
    },
    imgClass: {
      type: String,
      default: ''
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
    }
  },
  computed: {
    hasClass () {
      const att = this.$attrs
      return hasIn(att, 'class') ? att.class : ''
    },
    hasOnCart () {
      return this.$store.getters['ShopingCart/hasOnCart'](this.item.id)
    }
  },
  mounted () {
    this.itemIsOnCart()
  },
  methods: {
    str_take (text) {
      const count = 35
      if (text && text.length > count) {
        const res = text.substr(0, count)
        return res + '...'
      }
      return text
    },
    addQuantityOnCart (value) {
      this.item.cartQuantities = value
    },
    /** \
     * jodi shoping cart a item ager thake add kora thake tahole oh somy je variant gula select korecilo ta product item a selected takbe jate visitor bujte pare ager ta tar oy variant gula select kora ace
     */

    itemIsOnCart () {
      const has = this.$store.getters['ShopingCart/show'](this.item.id)

      if (has) {
        // eslint-disable-next-line vue/no-mutating-props
        this.item.selected_vartians = has.selected_vartians
      }
    },

    go () {
      alert('go')
    },
    img (images) {
      const img = head(images)
      return img
    }
  }
}
</script>
