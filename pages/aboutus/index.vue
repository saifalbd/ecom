<template>
  <div class="aboutus">
    <StaticBannerBox
      :title="info.title"
      :sub-title="info.sub_title"
      :src="info.thumbnail.url"
      :ratio="info.imageRatio"
    />
    <div class="text-box">
      <p v-for="(p, index) in info.contents" :key="index">
        {{ p.text }}
      </p>
    </div>
  </div>
</template>

<script>
import placeholder from '@/assets/aboutus.jpg'
import StaticBannerBox from '@/components/Organized/StaticBannerBox.vue'
export default {
  components: {
    StaticBannerBox
  },
  async asyncData ({ $apiUrl, $axiosWithoutToken }) {
    const url = $apiUrl('app.static.aboutUs', {}, false)
    const { data } = await $axiosWithoutToken.get(url)
    const info = data
    return { info }
  },
  data () {
    return {
      placeholder,
      info: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
