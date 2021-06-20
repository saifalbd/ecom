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
      const url = this.$apiUrl('app.category.index', {}, false)

      const { data } = await this.$axiosWithoutToken.get(url)
      this.categories = data.data.map((c) => {
        let name
        if (c.childrens_count) {
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
  },
  activated () {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  }
}
</script>
