<template>
  <b-overlay :show="busy" tag="div" class="offer-slider">
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

    <splide
      v-if="!busy && items.length"
      ref="primary"
      :options="primaryOptions"
    >
      <splide-slide v-for="(item, index) in items" :key="index">
        <offer-card :item="item" />
      </splide-slide>
    </splide>
  </b-overlay>
</template>

<script>
import OfferCard from '@/components/Organized/OfferCard.vue'
import { BIconBox, BIconCardList } from 'bootstrap-vue'

export default {
  components: { OfferCard, BIconBox, BIconCardList },
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
    }
  },
  data () {
    return {
      isBox: false,

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

<style lang="scss" scoped>
.imageBox {
  // height: 800px;
  // width: 700px;
  background: red;

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
m
