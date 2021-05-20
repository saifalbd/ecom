<template>
  <div>
    <b-button
      v-show="show"
      squared
      :variant="variant"
      :size="size"
      :disabled="disabled"
      @click="more"
    >
      more
    </b-button>
  </div>
</template>

<script>
import Pagination from '@/plugins/product/Pagination'
export default {
  name: 'PaginationMore',
  props: {
    meta: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'more'
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
      return this.pagination.hasNext()
    },
    show () {
      if (!this.hasNext) {
        return !this.hideOnNoNext
      }
      return true
    },
    disabled () {
      return !this.hasNext || this.busy
    }
  },
  created () {
    this.pagination = Pagination.info(this.meta)
  },
  methods: {
    more () {
      try {
        const p = Pagination.info(this.meta)
        if (p.hasNext()) {
          this.$emit('next-params', p.nextPageParams())
        } else {
          this.disabled = true
        }
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
  }
}
</script>
