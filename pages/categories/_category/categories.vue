<template>
  <div class="categories">
    <div class="top-title">
      Categories
    </div>
    <div class="category-items">
      <b-link
        v-for="(category, index) in categories"
        :key="index"
        class="category"
        :to="category.to"
      >
        <div class="inner">
          <b-img v-if="category.image" :src="category.image.url" />
          <div class="title">
            {{ category.title }}
          </div>
        </div>
      </b-link>
    </div>
  </div>
</template>

<script>
// all categories list
export default {
  data () {
    return {
      categories: []
    }
  },
  // call fetch only on client-side
  fetchOnServer: true,
  async fetch () {
    try {
      const parent = this.$route.params.category
      const url = this.$apiUrl('app.category.index', { parent }, false)

      const { data } = await this.$axiosWithoutToken.get(url)
      this.categories = data.data.map((c) => {
        let name
        if (parseInt(c.childrens_count)) {
          name = 'categories-category-categories'
        } else {
          name = 'categories-category'
        }

        const params = { category: c.id }
        const to = { name, params }
        c.to = to
        return c
      })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
