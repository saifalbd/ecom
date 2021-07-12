<template>
  <div>
    <div class="page404">
      <img :src="page404">
    </div>
  </div>
</template>
<script>
import page404 from '@/assets/404.jpg'
export default {
  components: {},
  layout: 'default',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      page404,
      pageTitle: 'not found page'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>

<style lang="scss"></style>
