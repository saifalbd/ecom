<template>
  <div class="search-page">
    <b-row v-if="searchCount">
      <b-col cols="12">
        <!-- {{ items }} -->
        <product-list :title="title" :items="items" />
      </b-col>
      <!-- <b-col cols="12">
        <pagination-more
          v-if="searchCount && pagination"
          hide-on-no-next
          :links="pagination"
          :busy="searchBusy"
          size="lg"
          @next-params="fetchItems"
        />
      </b-col> -->
    </b-row>

    <div class="onBack" @click="onBack">
      History Back
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mixer } from '@/plugins/product/index'
// import PaginationMore from './PaginationMore.vue'
import ProductList from './ProductList.vue'

export default {
  components: {
    ProductList
  },

  computed: {
    ...mapState('Search', [
      'searchItems',
      'searchBusy',
      'searchValue',
      'searchCount',
      'pagination',
      'searchView'
    ]),
    items () {
      return this.searchItems.map(e => mixer(e))
    },

    title () {
      return `Total ${this.searchCount} items found`
    }
  },
  mounted () {
    this.removeData()
  },
  methods: {
    ...mapActions('Search', ['removeData', 'searchFetch', 'set_data']),
    onBack () {
      this.removeData()
    },
    async fetchItems (params = {}) {
      alert(5)
      try {
        const value = this.searchValue
        const obj = { ...params, value }
        console.log(params)
        const url = this.$apiUrl('app.item.search', obj, false)
        const { data } = await this.$axiosWithoutToken.get(url)

        // this.set_data(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
