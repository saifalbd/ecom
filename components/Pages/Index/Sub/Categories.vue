<template>
  <div class="categories">
    <b-link
      v-for="(category, index) in categories"
      :key="index"
      class="category"
      :to="category.to"
    >
      <div class="inner">
        <img v-if="category.image" :src="category.image.url">
        <div class="title">
          {{ category.title }}
        </div>
      </div>
    </b-link>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    categories () {
      const d = {
        title: 'Show All',
        to: { name: 'categories' }
      }
      const categories = cloneDeep(this.items).map((c) => {
        const name = 'categories-category'
        const params = { category: c.id }
        const to = { name, params }
        c.to = to
        return c
      })
      if (categories.length > this.limit) {
        const cIs = categories.filter((e, i) => i < this.limit)
        cIs.push(d)
        return cIs
      }

      return categories
    }
  }
}
</script>

<style lang="scss" scoped></style>
