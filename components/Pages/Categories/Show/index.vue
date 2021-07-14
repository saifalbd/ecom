<template>
  <div class="category">
    <client-only>
      <CartSideIconBox />
      <ItemsCanEmpty :show="items.length ? false : true && !busy" />
      <b-row>
        <b-col cols="12">
          <product-list
            :busy="busy"
            :settings="settings"
            :items="items"
            :title="title"
          />
        </b-col>

        <b-col cols="12" class="mt-2">
          <pagination-more
            v-if="loaded && metaLinks"
            hide-on-no-next
            :links="metaLinks"
            :busy="busy"
            size="normal"
            title="Load more"
            @next-params="$fetch($event)"
          />
        </b-col>
      </b-row>
    </client-only>
  </div>
</template>

<script>
import { validate, mixer } from '@/plugins/product/index'
import PaginationMore from '@/components/Organized/PaginationMore.vue'
import ProductList from '@/components/Organized/ProductList.vue'
import CartSideIconBox from '@/components/Pragment/CartSideIconBox.vue'
import ItemsCanEmpty from '@/components/Pragment/ItemsCanEmpty.vue'
export default {
  components: {
    ProductList,
    PaginationMore,
    CartSideIconBox,
    ItemsCanEmpty
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      busy: false,
      loaded: false,
      items: [],
      metaLinks: null,
      settings: {}
    }
  },
  async fetch (params = {}) {
    // eslint-disable-next-line camelcase
    const category_slug = this.$route.params.category
    const paramsIs = { ...params, ...{ category_slug } }

    try {
      this.busy = true

      const url = this.$apiUrl('app.category.show.items', paramsIs, false)
      const { data } = await this.$axiosWithoutToken.get(url)

      // console.log(data)

      this.metaLinks = data.links
      this.settings = data.meta.settings
      this.loaded = true

      this.items = data.data.map((item) => {
        validate(item)
        // add addtional info for product
        return mixer(item)
      })
    } catch (error) {
      console.error(error)
    }
    this.busy = false
  },
  computed: {},

  created () {},

  methods: {}
}
</script>
