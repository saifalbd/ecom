<template>
  <b-row align-h="around">
    <div v-for="(options, key) in variants" :key="key">
      <label class="font-weight-bold" for=""> {{ key }}: </label>
      <!--
      @click="item.variant_options[key]=op.option_id"

 -->
      <b-badge
        v-for="(op, index) in options"
        :key="index"
        class="pointer"
        :variant="isSelected(key, op) ? 'primary' : 'light'"
      >
        {{ op.optionTitle }}
      </b-badge>
    </div>
  </b-row>
</template>

<script>
import { isPlainObject, forIn } from 'lodash'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    variants: {
      type: Object,
      required: true,
      validator (value) {
        try {
          if (!isPlainObject(value)) {
            // eslint-disable-next-line no-throw-literal
            throw 'variants must be a object'
          }
          forIn(value, (v, key) => {
            if (!Array.isArray(v)) {
              // eslint-disable-next-line no-throw-literal
              throw 'variants key index must be Array'
            }
          })
        } catch (error) {
          console.error(error)
          return false
        }

        return true
      }
    },
    selectType: {
      required: true,
      type: String,
      validator (v) {
        if (v) {
          if (!['select', 'radio'].includes(v)) {
            console.error('selectType must be select or radio')
            return false
          }
        }

        return true
      }
    }
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    isSelected (key, op) {
      const selected = this.item.variant_options

      return this.item.variant_options[key].optionId === op.optionId
    },
    isActive () {}
  }
}
</script>
