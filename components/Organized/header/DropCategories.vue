<template>
  <b-dropdown
    :style="{ minWidth: `${minWidth}px` }"
    class="dropSelect"
    :text="dropTxt.title"
    :variant="variant"
  >
    <b-dropdown-item
      v-for="(item, index) in categories"
      :key="index"
      :to="{
        name: 'categories-category',
        params: { category: item.id }
      }"
      @click="dropClick(item)"
    >
      <span class="pl-1 pr-1">{{ item.title }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    minWidth: {
      type: Number,
      default: 100
    },
    variant: {
      type: String,
      default: 'warning'
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dropTxt: {
        id: 0,
        title: 'Categories'
      }
    }
  },
  methods: {
    dropClick (item) {
      this.dropTxt = item
    }
  }
}
</script>
