<template>
  <div class="top-board">
    <div class="menu-box">
      <ul>
        <li v-for="(item, index) in categories" :key="index">
          <b-link :to="{name:'categories-category', params:{category:item.slug}}" v-text="item.title" />
        </li>
      </ul>
    </div>
    <div class="carosole-box">
      <PagesIndexSubTopCarosole
        :busy="false"
        :items="banners"
        :radio="imageSettings.banner.radio"
      />
    </div>
    <div class="offer-box" :class="{ hide: !offers.length }">
      <PagesIndexSubOfferSlider
        name=""
        :busy="busy"
        :items="offers"
        :radio="imageSettings.offer.radio"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imageSettings: {
      type: Object,
      required: true
    },
    busy: {
      type: Boolean,
      required: true
    },
    banners: {
      type: Array,
      required: true
    },
    offers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.fetchx()
  },
  methods: {
    async fetchx () {
      const url = await this.$apiUrl('app.category.index', {}, false)
      const { data } = await this.$axiosWithoutToken.get(url)
      this.categories = data.data
    }
  }
}
</script>
