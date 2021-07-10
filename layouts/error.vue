<template>
  <div>
    <div v-if="error.statusCode === 404">
      <div class="page404">
        <img :src="page404">
      </div>
    </div>
    <div v-else>
      {{ error }}
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
      pageTitle: 'patterson.travel'
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
