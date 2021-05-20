<template>
  <b-modal
    v-model="dialog"
    size="sm"
    header-bg-variant="danger"
    header-text-variant="warning"
    ok-only
    ok-title="close"
    :title="`Error ${titlePadRight}`"
  >
    {{ message }}
  </b-modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    titlePadRight: {
      type: [Number, String],
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
