<template>
  <div>
    <splide ref="primary" :options="primaryOptions">
      <splide-slide v-for="(img, index) in images" :key="index">
        <div class="imageBox">
          <img :src="img.url">
        </div>
      </splide-slide>
    </splide>

    <splide ref="secondary" :options="secondaryOptions">
      <splide-slide v-for="(img, index) in images" :key="index">
        <div class="imageBox">
          <img :src="img.url">
        </div>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
// import One from '@/assets/demo/1.jpg';
// import Two from '@/assets/demo/2.jpg';
// import Three from '@/assets/demo/3.jpg';
// import Four from '@/assets/demo/4.jpg';
// import Five from '@/assets/demo/5.jpg';
// import Six from '@/assets/demo/6.jpg';
// import Seven from '@/assets/demo/7.jpg';
// import Eight from '@/assets/demo/8.jpg';
// import Nine from '@/assets/demo/9.png';
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      primaryOptions: {
        autoplay: false,
        heightRatio: 1,
        pagination: false,
        arrows: true,
        type: 'loop',
        cover: true
      },
      secondaryOptions: {
        type: 'slide',
        rewind: true,

        gap: '1rem',
        pagination: false,
        fixedWidth: 110,
        fixedHeight: 70,
        cover: true,
        arrows: true,
        focus: 'center',
        isNavigation: true
      }
    }
  },
  mounted () {
    this.$refs.primary.sync(this.$refs.secondary.splide)
  }
}
</script>

<style lang="scss" scoped>
.imageBox {
  height: 100%;
  width: 100%;
  background: red;

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
