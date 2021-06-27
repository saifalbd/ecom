<template>
  <ShowProduct :item="product" />
</template>

<script>
import ShowProduct from '@/components/Pages/Products/Show/Index.vue'
import { has } from 'lodash'
export default {
  components: {
    ShowProduct
  },
  async asyncData ({ $apiUrl, params, $axios }) {
    const url = $apiUrl('app.item.show', { item: params.slug }, false)
    const { data } = await $axios.get(url)
    data.cartQuantities = 1
    if (has(data, 'specification')) {
      if (!Array.isArray(data.specification)) {
        data.specification = []
      }
    }
    return { product: data }
  },

  head () {
    const meta = this.product.meta
    const title = meta.title

    const metaArr = []
    for (const x in meta) {
      const hid = x
      const name = x
      const content = meta[x]
      metaArr.push({ hid, name, content })
    }
    return {
      title,
      meta: metaArr
    }
  }
}
</script>
