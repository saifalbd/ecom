<template>
  <div>
    <!-- {{ vendor }} -->
    <b-row v-if="author">
      <b-col cols="12">
        <product-list
          :busy="busy"
          :items="items(author.items.data)"
          :title="author.name"
          :settings="author.items.meta.settings"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductList from '@/components/Organized/ProductList.vue'
import { mixer } from '@/plugins/product/index'
import ItemsCanEmpty from '@/components/Pragment/ItemsCanEmpty.vue'
export default {
  components: {
    ProductList
  },
  async asyncData ({ params, $axiosWithoutToken, $apiUrl }) {
    const author = params.author
    const url = $apiUrl('app.author.show', { author }, false)

    const { data } = await $axiosWithoutToken.get(url)
    return { author: data.data }
  },
  data () {
    return {
      busy: false
    }
  },
  // call fetch only on client-side
  // fetchOnServer: false,
  // async fetch () {
  //   try {
  //     const author = this.$route.params.author
  //     const url = this.$apiUrl('app.author.show', { author }, false)

  //     const { data } = await this.$axiosWithoutToken.get(url)
  //     this.author = data.data
  //   } catch (error) {
  //     console.error(error)
  //   }
  // },
  // activated () {
  //   // Call fetch again if last fetch more than 30 sec ago
  //   if (this.$fetchState.timestamp <= Date.now() - 30000) {
  //     this.$fetch()
  //   }
  // },
  methods: {
    items (items) {
      return items.map(e => mixer(e))
    }
  }
}
</script>
