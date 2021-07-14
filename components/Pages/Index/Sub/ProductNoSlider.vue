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

    <div class="product-list" :class="{ horizontal: !isBox, ...breakpoint }">
      <div v-for="(item, index) in items" :key="item.id" class="product-item">
        <product-card
          v-if="isBox"
          :show-category="false"
          class="responsive"
          :item="item"
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

    <b-row no-gutters align-h="center">
      <b-col cols="12" class="text-center mt-2">
        <b-button
          v-show="showMore"
          size="sm"
          variant="outline-info"
          squared
          @click.stop="$emit('clickMore', $event)"
        >
          <BIconMinecartLoaded />
          <span class="ml-1">
            MORE
          </span>
        </b-button>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import { BIconBox, BIconCardList, BIconMinecartLoaded } from 'bootstrap-vue'
import ProductCard from '@/components/Organized/ProductCard.vue'
import ProductCardHorizontal from '@/components/Organized/ProductCardHorizontal.vue'
export default {
  components: {
    ProductCard,
    ProductCardHorizontal,
    BIconBox,
    BIconCardList,
    BIconMinecartLoaded
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
    settings: {
      type: Object,
      default () {
        return {}
      }
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
  computed: {
    breakpoint () {
      const { breakpoint } = this.settings
      if (!breakpoint) { return {} }
      const result = {}

      for (const key in breakpoint) {
        result[`${key}-${breakpoint[key]}`] = true
      }

      return result
    }
  },
  created () {},
  mounted () {
    // this.$refs.primary.sync(this.$refs.secondary.splide);
  },

  methods: {}
}
</script>
