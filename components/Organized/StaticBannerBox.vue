<template>
  <div class="banner-box" :style="`background-image: url('${src}')`">
    <b-aspect :aspect="ratio" />
    <div class="inner-box">
      <div class="title">
        {{ title }}
      </div>
      <div class="sub-title">
        {{ subTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    ratio: {
      type: [String, Number],
      default: 4
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
