<template>
  <div>
    <!-- {{ vendor }} -->
    <b-row>
      <b-col>
        <b-card-title v-text="vendor.name" />
      </b-col>
      <b-col v-for="cat in vendor.categories" :key="cat.id" cols="12">
        <product-list :busy="busy" :items="cat.items" :title="cat.title" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductList from '@/components/Organized/ProductList.vue'
export default {
  components: {
    ProductList
  },
  data () {
    return {
      busy: false,
      vendor: {
        name: '',
        categories: []
      }
    }
  },
  // call fetch only on client-side
  fetchOnServer: false,
  async fetch () {
    try {
      const vendor = this.$route.params.vendor
      const url = this.$apiUrl('app.vendor.show', { vendor }, false)

      const { data } = await this.$axiosWithoutToken.get(url)
      this.vendor = data.data
    } catch (error) {
      console.error(error)
    }
  },
  activated () {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  }
}
</script>
