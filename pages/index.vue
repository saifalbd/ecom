<template>
  <div class="home-page">
    <client-only>
      <top-carosole :busy="busy" :items="banners" />
    </client-only>
    <b-row>
      <b-col cols="12">
        <div class="top-bar">
          <h4>
            Choice Vendors
          </h4>
        </div>
        <VendorsComponent :busy="busy" :items="vendors" />
      </b-col>
    </b-row>

    <client-only keep-alive>
      <offer-slider :busy="busy" :items="offers" />
    </client-only>

    <b-row>
      <b-col cols="12">
        <div class="top-bar">
          <h4>
            Choice Categories
          </h4>
        </div>
        <CategoriesComponent :items="categories" />
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
          @clickMore="loadMoreItems(index)"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VendorsComponent from '@/components/Pages/Index/Sub/Vendors.vue'
import CategoriesComponent from '@/components/Pages/Index/Sub/Categories.vue'
import OfferSlider from '@/components/Pages/Index/Sub/OfferSlider.vue'
import ProductSlider from '@/components/Pages/Index/Sub/ProductSlider.vue'
import TopCarosole from '@/components/Pages/Index/Sub/TopCarosole.vue'
import ProductNoSlider from '@/components/Pages/Index/Sub/ProductNoSlider.vue'
import {
  asyncData,
  methods
} from '@/components/Pages/Index/Internal/fetchCollectionAll.js'
import { hasIn, isUndefined } from 'lodash'
import { validate, mixer } from '@/plugins/product/index'

export default {
  // mixins: [fetchColletions],
  components: {
    TopCarosole,
    OfferSlider,
    ProductSlider,
    ProductNoSlider,
    CategoriesComponent,
    VendorsComponent
  },
  data () {
    return {
      busy: false,
      banners: [],
      offers: [],
      categories: [],
      vendors: [],
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
      if (!hasIn(data, 'vendors')) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.vendors missing'
      }
      if (!hasIn(data, 'categories')) {
        // eslint-disable-next-line no-throw-literal
        throw 'data.categories missing'
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
      this.vendors = data.vendors
      this.banners = data.banners
      this.offers = data.offers
      this.collection = data.collection.map((item) => {
        item.busy = false
        item.data = item.data.map(obj => mixer(obj))
        return item
      })
    } catch (error) {
      console.error(error)
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
