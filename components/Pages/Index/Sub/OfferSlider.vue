<template>
  <b-overlay :show="busy" tag="div" class="offer-slider">
    <div v-show="name" class="top-bar">
      <h4>
        {{ name }}
      </h4>
    </div>

    <splide
      v-if="!busy && items.length"
      ref="primary"
      :options="primaryOptions"
    >
      <splide-slide v-for="(item, index) in items" :key="index">
        <offer-card :item="item" :radio="radio"/>
      </splide-slide>
    </splide>
  </b-overlay>
</template>

<script>
import OfferCard from '@/components/Organized/OfferCard.vue'

export default {
  components: { OfferCard },
  props: {
    radio: {
      type: Number,
      required: true
    },
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

        arrows: false,

        isNavigation: false
      }
    }
  },
  created () {},
  mounted () {
    this.primaryOptions.heightRatio = this.radio
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
