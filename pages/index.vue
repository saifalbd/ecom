<template>
  <div class="home-page">
    <CartSideIconBox />
    <client-only>
      <top-carosole
        :radio="imageSettings.banner.radio"
        :busy="busy"
        :items="banners"
      />
    </client-only>
    <client-only keep-alive>
      <offer-slider
        :radio="imageSettings.offer.radio"
        :busy="busy"
        :items="offers"
      />
    </client-only>
    <!-- <client-only>
    <PagesIndexSubTopBoard :busy="busy" :banners="banners" :offers="offers" :imageSettings="imageSettings" />
    </client-only> -->
    <b-row class="mb-2">
      <b-col cols="12">
        <client-only v-if="flashDeal">
          <FlashDealComponent
            :items="flashDeal.items"
            :until="flashDeal.valid_until"
          />
        </client-only>
      </b-col>
      <b-col v-for="(obj, index) in collection" :key="index" cols="12">
        <client-only v-if="obj.meta.with_slider">
          <product-slider
            :busy="obj.busy"
            :items="obj.data"
            :name="obj.meta.display_title"
          />
        </client-only>
        <product-no-slider
          v-else
          :show-more="obj.meta.offset ? true : false"
          :busy="obj.busy"
          :items="obj.data"
          :name="obj.meta.display_title"
          :settings="obj.meta.settings"
          @clickMore="loadMoreItems(index)"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import VendorsComponent from '@/components/Pages/Index/Sub/Vendors.vue'
// import CategoriesComponent from '@/components/Pages/Index/Sub/Categories.vue'
import CartSideIconBox from '@/components/Pragment/CartSideIconBox.vue'
import OfferSlider from '@/components/Pages/Index/Sub/OfferSlider.vue'
import ProductSlider from '@/components/Pages/Index/Sub/ProductSlider.vue'
import TopCarosole from '@/components/Pages/Index/Sub/TopCarosole.vue'
import FlashDealComponent from '@/components/Pages/Index/Sub/FlashDeal.vue'
import ProductNoSlider from '@/components/Pages/Index/Sub/ProductNoSlider.vue'
import { methods } from '@/components/Pages/Index/Internal/fetchCollectionAll.js'
import { mixer } from '@/plugins/product/index'

export default {
  components: {
    TopCarosole,
    OfferSlider,
    ProductSlider,
    ProductNoSlider,
    CartSideIconBox,
    FlashDealComponent
    // CategoriesComponent,
    // VendorsComponent
  },
  async asyncData ({ $axiosWithoutToken, $apiUrl }) {
    const url = $apiUrl('app.homePage', {}, false)
    console.log(url)
    const { data } = await $axiosWithoutToken.get(url)
    const categories = data.categories
    const offers = data.offers
    const banners = data.banners
    const flashDeal = data.flashDeal
    const imageSettings = data.imageSettings
    if (flashDeal && flashDeal.items && Array.isArray(flashDeal.items)) {
      flashDeal.items = flashDeal.items.map((item) => {
        return mixer(item)
      })
    }
    const collection = data.collection.map((item) => {
      item.busy = false
      item.data = item.data.map(obj => mixer(obj))
      return item
    })
    console.log(collection)
    return {
      imageSettings,
      categories,
      offers,
      banners,
      flashDeal,
      collection
    }
  },
  data () {
    return {
      busy: false
    }
  },

  mounted () {
    this.fetchNextAll()
  },
  created () {},

  methods
}
</script>
