<template>
  <!-- Using components -->

  <b-input-group :size="size" class="quantity-adder">
    <b-input-group-prepend v-if="showPlusMinus">
      <b-button squared class="px-1" :variant="variant" @click.stop="minus">
        <BIconDashSquare :scale="0.9" />
      </b-button>
    </b-input-group-prepend>

    <b-form-select
      v-model="model"
      type="number"
      min="1"
      :style="`width:${inputWidth}!important;`"
      :options="quantitesNumbers"
    />
    <b-input-group-append v-if="showPlusMinus">
      <b-button class="px-1" squared :variant="variant" @click.stop="plus">
        <BIconPlusSquare :scale="0.9" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import { BIconPlusSquare, BIconDashSquare } from 'bootstrap-vue'
export default {
  components: {
    BIconPlusSquare,
    BIconDashSquare
  },
  props: {
    value: {
      type: Number,
      required: true,
      validator (v) {
        if (v < 1) {
          console.error('QuantityGroupAdder value must be a gratter than 0')
          return false
        }
        return true
      }
    },
    size: {
      type: String,
      default: 'sm'
    },
    variant: {
      type: String,
      default: 'danger'
    },
    inputWidth: {
      type: [String, Number],
      default: 'auto'
    },
    showPlusMinus: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      quantitesNumbers: []
    }
  },
  computed: {
    model: {
      get () {
        const val = parseInt(this.value)
        return val || 1
      },
      set (val) {
        let value = parseInt(val)
        if (!value) {
          value = 1
        }
        this.$emit('input', value)
      }
    }
  },
  created () {
    this.quantitesNumbers = this.arr_times(20)
  },
  methods: {
    plus () {
      if (
        this.model !== this.quantitesNumbers[this.quantitesNumbers.length - 1]
      ) {
        this.model++
      }
    },
    minus () {
      if (this.model > 1) {
        this.model--
      }
    },
    arr_times (num) {
      const arr = []
      for (let i = 0; i < num; i++) {
        arr.push(i + 1)
      }
      return arr
    }
  }
}
</script>
