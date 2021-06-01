<template>
  <div>
    logout
  </div>
</template>

<script>
export default {
  layout: 'loginRegister',
  async asyncData ({ $auth, redirect }) {
    await $auth.logout()
    redirect('/')

    return {}
  }
}
</script>
