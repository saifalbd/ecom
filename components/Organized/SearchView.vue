<template>
  <div class="search-page">
    <b-row v-if="searchCount">
      <b-col cols="12">
        <product-list :title="title" :items="items" />
      </b-col>
      <b-col cols="12">
        <pagination-more
          v-if="searchCount"
          hide-on-no-next
          :meta="pagination"
          :busy="searchBusy"
          size="lg"
          @next-params="fetchItems"
        />
      </b-col>
    </b-row>

    <div class="onBack" @click="onBack">
      History Back
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PaginationMore from './PaginationMore.vue'
import ProductList from './ProductList.vue'
export default {
  components: {
    ProductList,
    PaginationMore
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
      return this.searchItems
    },

    title () {
      return `Total ${this.searchCount} items found`
    }
  },
  mounted () {
    this.removeData()
  },
  methods: {
    ...mapActions('Search', ['removeData', 'searchFetch']),
    onBack () {
      this.removeData()
    },
    fetchItems (params) {
      const value = this.searchValue
      const obj = { ...params, value }
      this.searchFetch(obj)
    }
  }
}
</script>
