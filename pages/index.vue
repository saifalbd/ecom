<template>
  <div class="home-page">
    <CartSideIconBox />
    <client-only>
      <top-carosole :busy="busy" :items="banners" />
    </client-only>

    <client-only keep-alive>
      <offer-slider :busy="busy" :items="offers" />
    </client-only>

    <b-row>
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
import ProductNoSlider from '@/components/Pages/Index/Sub/ProductNoSlider.vue'
import { methods } from '@/components/Pages/Index/Internal/fetchCollectionAll.js'
import { hasIn } from 'lodash'
import { mixer } from '@/plugins/product/index'
export default {
  components: {
    TopCarosole,
    OfferSlider,
    ProductSlider,
    ProductNoSlider,
    CartSideIconBox
    // CategoriesComponent,
    // VendorsComponent
  },
  data () {
    return {
      busy: false,
      banners: [],
      offers: [],
      categories: [],
      // vendors: [],
      collection: []
    }
  },
  fetchOnServer: true,

  async fetch () {
    try {
      const url = this.$apiUrl('app.homePage', {}, false)

      const { data } = await this.$axiosWithoutToken.get(url)

      if (!hasIn(data, 'banners')) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.banners missing'
      }
      if (!hasIn(data, 'offers')) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.offers missing'
      }

      if (!hasIn(data, 'collection')) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.collection missing'
      }
      if (!Array.isArray(data.collection)) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.collection must be Array'
      }

      this.categories = data.categories

      this.offers = data.offers
      this.banners = data.banners
      const collection = data.collection.map((item) => {
        item.busy = false
        item.data = item.data.map(obj => mixer(obj))
        return item
      })
      this.collection = collection
    } catch (error) {
      console.error(error)
    }
  },
  activated () {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
      this.fetchNextAll()
    }
  },

  mounted () {
    this.fetchNextAll()
  },
  created () {},

  methods
}
</script>
