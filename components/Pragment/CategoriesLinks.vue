<template>
  <b-card-sub-title class="category-links">
    <span>
      Categories:
    </span>
    <b-link
      v-for="(c, index) in categories"
      :key="index"
      :to="{
        name: 'categories-category',
        params: { category: c.slug },
        query: { name: c.title }
      }"
    >
      {{ c.title }}
    </b-link>
  </b-card-sub-title>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>
