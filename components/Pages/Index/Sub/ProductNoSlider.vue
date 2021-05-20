<template>
  <b-overlay :show="busy" tag="div" class="product-slider">
    <div class="top-bar">
      <h4>{{ name }}</h4>
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

    <div class="product-list" :class="{ horizontal: !isBox }">
      <div v-for="(item, index) in items" :key="item.id" class="product-item">
        <product-card v-if="isBox" class="responsive" :item="item" />
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

    <b-row no-gutters align-h="center">
      <b-col cols="12">
        <b-button
          v-show="showMore"
          size="sm"
          variant="outline-info"
          squared
          @click.stop="$emit('clickMore', $event)"
        >
          more
        </b-button>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import { BIconBox, BIconCardList } from 'bootstrap-vue'
import ProductCard from '@/components/Organized/ProductCard.vue'
import ProductCardHorizontal from '@/components/Organized/ProductCardHorizontal.vue'
export default {
  components: {
    ProductCard,
    ProductCardHorizontal,
    BIconBox,
    BIconCardList
  },
  props: {
    name: {
      type: String,
      default: 'Recent Offers'
    },
    busy: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    showMore: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isBox: true,

      primaryOptions: {
        rewind: false,

        gap: '1rem',
        type: 'loop',
        pagination: false,
        autoWidth: true,

        arrows: true,

        isNavigation: false
      }
    }
  },
  created () {},
  mounted () {
    // this.$refs.primary.sync(this.$refs.secondary.splide);
  },

  methods: {}
}
</script>
