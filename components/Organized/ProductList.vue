<template>
  <div class="category">
    <div class="top-bar">
      <h4>{{ title }}</h4>
      <b-button-group size="sm" class="flex-end">
        <b-button
          size="sm"
          :variant="isBox ? 'primary' : 'outline-primary'"
          @click="isBox = true"
        >
          <BIconBox />
        </b-button>
        <b-button
          size="sm"
          :variant="!isBox ? 'primary' : 'outline-primary'"
          @click="isBox = false"
        >
          <BIconCardList />
        </b-button>
      </b-button-group>
    </div>

    <b-overlay :show="busy" tag="div">
      <div class="product-list" :class="{ horizontal: !isBox }">
        <div v-for="(item, index) in items" :key="item.id" class="product-item">
          <product-card
            v-if="isBox"
            class="responsive"
            :item="item"
            :show-category="false"
          />
          <product-card-horizontal
            v-else
            :item-id="item.id"
            title-class="sm"
            :cart-button-show="true"
            :quantity-adder-show="false"
            quantity-adder-width="70px"
            :remove-button-show="true"
            :show-category="true"
            :item="items[index]"
          />
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { BIconCardList, BIconBox } from 'bootstrap-vue'
import ProductCard from '@/components/Organized/ProductCard.vue'
import ProductCardHorizontal from '@/components/Organized/ProductCardHorizontal.vue'
export default {
  components: {
    ProductCard,
    ProductCardHorizontal,
    BIconCardList,
    BIconBox
  },
  props: {
    items: {
      type: Array,
      required: true
    },

    title: {
      type: String,
      default: ''
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isBox: true
    }
  },
  computed: {
    cols () {
      if (this.isBox) {
        return 'col-auto'
      } else {
        return 'col-12'
      }
    }
  },
  watch: {},

  methods: {}
}
</script>
