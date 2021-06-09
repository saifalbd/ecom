<template>
  <b-card class="h-100" bg-variant="light">
    <b-row class="h-100" align-v="center">
      <b-col cols="12">
        {{ title }}
      </b-col>
      <b-col cols="12" class="mt-2">
        <b-button
          squared
          block
          variant="outline-primary"
          @click.stop="facebook"
        >
          Facebook
        </b-button>
        <b-button squared block variant="outline-primary">
          Github
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Login'
    }
  },
  methods: {
    async facebook () {
      try {
        const res = await this.$auth.loginWith('facebook')
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
