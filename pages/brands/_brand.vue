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
  }
}
</script>
