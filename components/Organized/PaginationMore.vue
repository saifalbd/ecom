<template>
  <div class="w-100 text-center">
    <b-button
      v-show="hasNext"
      squared
      :variant="variant"
      :size="size"
      :disabled="disabled"
      @click="more"
    >
      {{ title }}
    </b-button>
  </div>
</template>

<script>
import Pagination from '@/plugins/product/SimplePaginate.js'
export default {
  name: 'PaginationMore',
  props: {
    links: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'MORE'
    },
    variant: {
      type: String,
      default: 'outline-primary'
    },
    size: {
      type: String,
      default: 'normal'
    },
    busy: {
      type: Boolean,
      default: false
    },
    hideOnNoNext: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pagination: null
    }
  },
  computed: {
    hasNext () {
      if (this.links) {
        console.log('has', this.pagination.hasNext())
        return this.pagination.hasNext()
      } else {
        return false
      }
    },
    disabled () {
      return !this.hasNext || this.busy
    }
  },
  created () {
    this.pagination = Pagination.info(this.links)
  },
  methods: {
    more () {
      try {
        const p = this.pagination
        if (p.hasNext()) {
          this.$emit('next-params', p.nextPageParams())
        } else {
          this.disabled = true
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
