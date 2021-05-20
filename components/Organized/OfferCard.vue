<template>
  <b-card
    class="offer-card"
    tag="a"
    :href="item.link"
    :img-src="item.thumbnail.url"
    img-alt="Card image"
    img-top
  >
    <b-card-title tag="div" style="color:black">
      {{ item.title }}
    </b-card-title>
    <b-card-sub-title tag="div" style="">
      {{ item.subtitle }}
    </b-card-sub-title>
  </b-card>
</template>

<script>
import { BCardSubTitle } from 'bootstrap-vue'
export default {
  components: {
    BCardSubTitle
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
