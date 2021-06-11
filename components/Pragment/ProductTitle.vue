<template>
  <b-link
    :to="{ name: 'products-slug', params: { slug } }"
    class="rd-item-name"
    v-bind="$attrs"
    v-text="title"
  />
</template>

<script>
export default {
  props: {
    slug: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
