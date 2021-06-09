<template>
  <div>
    <b-modal v-model="dialog" hide-footer title="Shipping Address">
      <Create
        @createdUser="$emit('createdUser', $event)"
        @done="$emit('done', $event)"
      />
    </b-modal>
  </div>
</template>

<script>

import Create from './ShipingAddressCreate.vue'
export default {
  components: {
    Create
  },

  props: {
    value: {
      type: Boolean,
      default: false
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
