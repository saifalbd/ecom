<template>
  <no-ssr>
    <div v-html="content" />
  </no-ssr>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  async fetch () {
    try {
      const url = this.$apiUrl('app.aboutUs.show', {}, false)
      const { data } = await this.$axiosWithoutToken(url)
    
      this.content = data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
