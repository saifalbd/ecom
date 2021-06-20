<template>
  <div>
    <!-- {{ vendor }} -->
    <b-row>
      <b-col>
        <b-card-title v-text="brand.name" />
      </b-col>
      <b-col v-for="cat in brand.categories" :key="cat.id" cols="12">
        <product-list :busy="busy" :items="cat.items" :title="cat.title" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import ProductList from '@/components/Organized/ProductList.vue'
export default {
  components: {
    ProductList
  },
  data () {
    return {
      busy: false,
      brand: {
        name: '',
        categories: []
      }
    }
  },
  // call fetch only on client-side
  fetchOnServer: false,
  async fetch () {
    try {
      const brand_slug = this.$route.params.brand
      const url = this.$apiUrl('app.brand.show', { brand_slug }, false)

      const { data } = await this.$axiosWithoutToken.get(url)
      this.brand = data.data
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
