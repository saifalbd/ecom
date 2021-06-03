<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    {{ error }}
  </div>
</template>
<script>
export default {
  components: {},
  layout: 'basic',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
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
