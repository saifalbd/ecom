<template>
  <b-card-sub-title class="category-links">
    <span>
      Category:
    </span>
    <b-link
      :to="{
        name: 'categories-category',
        params: { category: category.slug }
      }"
    >
      {{ category.title }}
    </b-link>
  </b-card-sub-title>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      required: true
    }
  }
}
</script>
