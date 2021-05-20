<template>
  <b-overlay :show="busy" tag="div" class="top-carosole">
    <splide
      v-if="!busy && items.length"
      ref="primary"
      :options="primaryOptions"
    >
      <splide-slide v-for="(b, index) in items" :key="index">
        <div class="imageBox">
          <img :src="b.thumbnail.url">
        </div>
      </splide-slide>
    </splide>
  </b-overlay>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'ssksk'
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
        autoplay: true,
        heightRatio: 1 / 2.5,
        pagination: false,
        arrows: true,
        type: 'loop',
        cover: true,
        gap: '0'
      }
    }
  },

  mounted () {
    // this.$refs.primary.sync(this.$refs.secondary.splide);
  }
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
