<template>
  <div>
    <!-- <slot
        slot
        v-bind:on="on">
        <b-button @click="on">Launch demo modal</b-button>
    </slot> -->
    <slot :on="on" />
    <shiping-address-model
      v-model="model"
      :is-edit="true"
      :edit-item="item"
      @done="$emit('done', $event)"
    />
  </div>
</template>

<script>
import ShipingAddressModel from './ShipingAddressModel.vue'

export default {
  components: {
    ShipingAddressModel
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      model: false
    }
  },
  methods: {
    on () {
      this.model = !this.model
    }
  }
}
</script>
