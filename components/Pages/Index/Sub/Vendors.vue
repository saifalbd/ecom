<template>
  <div class="vendors">
    <b-link
      v-for="(vendor, index) in vendors"
      :key="index"
      class="vendor"
      :to="vendor.to"
    >
      <div class="inner">
        <img
          v-if="vendor.image"
          :src="vendor.image.url"
          :alt="vendor.image.name"
        >
        <div class="title">
          {{ vendor.name }}
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
    vendors () {
      const d = {
        name: 'Show All',
        to: { name: 'vendors' }
      }
      const vendors = cloneDeep(this.items).map((c) => {
        const name = 'vendors-vendor'
        const params = { vendor: c.id }
        const to = { name, params }
        c.to = to
        return c
      })
      if (vendors.length > this.limit) {
        const cIs = vendors.filter((e, i) => i < this.limit)
        cIs.push(d)
        return cIs
      }

      return vendors
    }
  }
}
</script>
