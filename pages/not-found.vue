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
