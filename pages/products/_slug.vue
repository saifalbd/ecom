<template>
  <ShowProduct :item="product" />
</template>

<script>

import ShowProduct from '@/components/Pages/Products/Show/Index.vue'
export default {
  components: {
    ShowProduct
  },
  async asyncData ({ $apiUrl, params, $axios }) {
    const url = $apiUrl('app.item.show', { item: params.slug }, false)
    const res = await $axios.get(url)
    return { product: res.data }
  },

  // async fetch () {
  //   try {
  //     const { data } = await restApi
  //       .ctx(this)
  //       .getIs()
  //       .itemShow(this.$route.params.slug)

  //     this.product = data
  //     return Promise.resolve(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   this.busy = false
  // },
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
