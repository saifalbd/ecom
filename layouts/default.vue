<template>
  <div class="guest-layout">
    <no-ssr>
      <HeadBox :categories="categories" />
    </no-ssr>
    <b-container fluid>
      <Nuxt />
    </b-container>
    <no-ssr>
      <AppFooter />
    </no-ssr>
    <no-ssr>
      <CartSidebar />
    </no-ssr>
  </div>
</template>

<script>
import HeadBox from '@/components/Organized/header/HeadBox.vue'
import AppFooter from '@/components/Organized/AppFooter/AppFooter.vue'
import CartSidebar from '@/components/Organized/CartSidebar.vue'
import { restApi } from '@/plugins/restApi/index'
export default {
  fetchOnServer: true,
  components: { HeadBox, AppFooter, CartSidebar },
  data () {
    return {
      categories: []
    }
  },
  // fetch (ctx) {
  //   console.log(ctx)
  //   const url = 'http://ginnibazar.lara/assets-media/1/content/confignew.json'
  //   // const res = await this.$axios.get(url)
  //   return { url }
  // },
  mounted () {
    setTimeout(() => {
      this.allCategories()
    }, 3000)
  },
  methods: {
    async allCategories () {
      try {
        const { data } = await restApi
          .ctx(this)
          .getIs()
          .categories()
        this.categories = data.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
