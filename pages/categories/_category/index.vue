<template>
  <ShowCategory :title="title" />
</template>

<script>
import ShowCategory from '@/components/Pages/Categories/Show/index.vue'
export default {
  components: {
    ShowCategory
  },
  async asyncData ({ $apiUrl, params, $axios }) {
    // eslint-disable-next-line camelcase
    const category_slug = params.category
    const paramsIs = {
      category_slug
    }
    const url = $apiUrl('app.category.show', paramsIs, false)
    const res = await $axios.get(url)

    const meta = res.data.meta
    const title = res.data.title

    return {
      meta,
      title
    }
  },
  head () {
    const meta = this.meta
    const title = this.title

    const metaArr = []
    for (const x in meta) {
      const hid = x
      const name = x
      const content = meta[x]
      metaArr.push({
        hid,
        name,
        content
      })
    }
    return {
      title,
      meta: metaArr
    }
  },
  deactivated () {
    this.$destroy()
  }
}
</script>
