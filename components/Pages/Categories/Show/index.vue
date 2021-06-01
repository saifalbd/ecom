<template>
  <div class="category">
    <b-row>
      <b-col cols="12">
        <product-list :busy="busy" :items="items" :title="name" />
      </b-col>
      <no-ssr>
        <b-col cols="12">
          <pagination-more
            v-if="loaded"
            hide-on-no-next
            :meta="meta"
            :busy="busy"
            size="lg"
            @next-params="$fetch($event)"
          />
        </b-col>
      </no-ssr>
    </b-row>
  </div>
</template>

<script>
import { validate, mixer } from '@/plugins/product/index'
import PaginationMore from '@/components/Organized/PaginationMore.vue'
import ProductList from '@/components/Organized/ProductList.vue'
import restApi from '@/plugins/restApi'
export default {
  components: {
    ProductList,
    PaginationMore
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      busy: false,
      loaded: false,
      items: [],
      meta: {}
    }
  },
  async fetch (params = {}) {
    const category = this.$route.params.category
    const paramsIs = { ...params, ...{ category } }

    try {
      this.busy = true

      const { data } = await restApi
        .ctx(this)
        .getIs()
        .categoryShowItems(paramsIs)

      this.meta = data.meta
      this.loaded = true

      this.items = data.data.map((item) => {
        validate(item)
        // add addtional info for product
        return mixer(item)
      })
      // .filter((item, index) => item.id === 14181)


    } catch (error) {
      console.error(error)
    }
    this.busy = false
  },
  computed: {},

  created () {
    // this.fethCategory()
  },

  methods: {}
}
</script>
