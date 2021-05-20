<template>
  <a
    class="price_tag"
    :class="{
      sm: size == 'sm',
      lg: size == 'lg',
      bold: isBold,
      off: off,
      border: isBorder,
      hover: isHover
    }"
  >
    <div class="off-line" />
    {{ price }}
  </a>
</template>

<script>
export default {
  props: {
    price: {
      type: [Number, String],
      required: true
    },
    size: {
      type: String, // sm/md/lg,
      default: 'md'
    },
    off: {
      type: Boolean,
      default: false
    },
    isBold: {
      type: Boolean,
      default: true
    },
    isBorder: {
      type: Boolean,
      default: true
    },
    isHover: {
      type: Boolean,
      default: false
    }
  },
  computed: {}
}
</script>
