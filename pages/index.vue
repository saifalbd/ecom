<template>
  <div class="home-page">
    <no-ssr>
      <top-carosole :busy="busy" :items="banners" />
    </no-ssr>
    <no-ssr>
      <offer-slider :busy="busy" :items="offers" />
    </no-ssr>

    <b-row>
      <b-col v-for="(obj, index) in collection" :key="index" cols="12">
        <no-ssr v-if="obj.meta.with_slider">
          <product-slider
            :busy="obj.busy"
            :items="obj.data"
            :name="obj.meta.display_title"
          />
        </no-ssr>
        <product-no-slider
          v-else
          :show-more="obj.meta.offset ? true : false"
          :busy="obj.busy"
          :items="obj.data"
          :name="obj.meta.display_title"
          @clickMore="loadMoreItems(index)"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import OfferSlider from '@/components/Pages/Index/Sub/OfferSlider.vue'
import ProductSlider from '@/components/Pages/Index/Sub/ProductSlider.vue'
import TopCarosole from '@/components/Pages/Index/Sub/TopCarosole.vue'
import ProductNoSlider from '@/components/Pages/Index/Sub/ProductNoSlider.vue'
import {
  asyncData,
  methods
} from '@/components/Pages/Index/Internal/fetchCollectionAll.js'

export default {
  // mixins: [fetchColletions],
  components: {
    TopCarosole,
    OfferSlider,
    ProductSlider,
    ProductNoSlider
  },
  asyncData,
  data () {
    return {
      busy: false,
      banners: [],
      offers: []
    }
  },

  created () {
    //  await this.fetchBannars();
    // await this.fetchOffers();
    // await this.fetchFetureds();
    // await this.fetchRecents();
    // await this.fetchTrandring();
  },
  methods
}
</script>
