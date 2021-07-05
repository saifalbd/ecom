<template>
  <b-button
    squared
    :size="size"
    class="add-to-card-button"
    :class="{ hasOn, fillWidth }"
    @click="onOnCart"
  >
    <BIconBagPlus v-show="!hasOn" />
    <BIconLink v-show="hasOn" />
    <span class="text">
      <slot />
    </span>
  </b-button>
</template>

<script>
import { mapActions } from 'vuex'
import { keys } from 'lodash'
import { BIconBagPlus, BIconLink } from 'bootstrap-vue'
export default {
  components: {
    BIconBagPlus,
    BIconLink
  },
  props: {
    value: {
      type: Number,
      required: true,
      validator (v) {
        if (v < 1) {
          console.error('Add to Cart value must be a gratter than 0')
          return false
        }
        return true
      }
    },
    item: {
      type: Object,
      required: true
    },
    hasOn: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'sm'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    fillWidth: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('ShopingCart', ['addItem', 'removeItem']),
    makeToast (variant = null) {
      this.$bvToast.toast('Add item on carts list', {
        title: 'Cart Notifications',
        variant,
        toaster: 'b-toaster-top-center',
        solid: true
      })
    },
    variantIsValid (item) {
      // jodi product without variant hoi
      if (!Object.keys(item.available_vartians).length) {
        return true
      }
      try {
        if (!keys(item.selected_vartians).length) {
          // eslint-disable-next-line no-throw-literal
          throw 'please select variant options first'
        }

        for (const key in item.available_vartians) {
          if (!item.selected_vartians[key]) {
            // eslint-disable-next-line no-throw-literal
            throw `Please Select ${key} Variant Options`
          }
        }

        return true
      } catch (error) {
        alert(error)
        return false
      }
    },

    onOnCart () {
      if (!this.hasOn) {
        this.addItem(this.item)
        this.makeToast('success')
      } else {
        this.$router.push({ name: 'checkout' })
      }
    }
  }
}
</script>
