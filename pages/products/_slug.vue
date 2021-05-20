<template>
  <ShowProduct :item="product" />
</template>

<script>
import restApi from '@/plugins/restApi'
import ShowProduct from '@/components/Pages/Products/Show/Index.vue'
export default {
  components: {
    ShowProduct
  },
  data () {
    return {
      product: null
    }
  },
  async fetch () {
    try {
      const { data } = await restApi
        .ctx(this)
        .getIs()
        .itemShow(this.$route.params.slug)

      this.product = data
    } catch (error) {
      console.error(error)
    }
    this.busy = false
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
