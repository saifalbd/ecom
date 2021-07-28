<template>
  <div class="aboutus">
    <StaticBannerBox
      :title="info.title"
      :sub-title="info.sub_title"
      :src="info.thumbnail.url"
      :ratio="info.imageRatio"
    />
    <div class="text-box">
      <div v-for="(p, index) in info.contents" :key="index">
        <h3>
          {{ p.title }}
        </h3>
        <p>
          {{ p.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import StaticBannerBox from '@/components/Organized/StaticBannerBox.vue'
export default {
  components: {
    StaticBannerBox
  },
  async asyncData ({ $apiUrl, $axiosWithoutToken }) {
    const url = $apiUrl('app.static.refundPolicy', {}, false)
    const { data } = await $axiosWithoutToken.get(url)
    const info = data
    return { info }
  },
  data () {
    return {
      info: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
