<template>
  <div class="guest-layout">
    <no-ssr>
      <HeadBox :categories="categories" />
    </no-ssr>
    <b-container fluid class="relative">
      <div class="page" :class="{ hide: searchView }">
        <Nuxt />
      </div>
      <div class="search-layout" :class="{ show: searchView }">
        <SearchView />
      </div>
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
import { mapState, mapActions } from 'vuex'
import SearchView from '@/components/Organized/SearchView.vue'
export default {
  fetchOnServer: true,
  components: { HeadBox, AppFooter, CartSidebar, SearchView },
  data () {
    return {
      categories: []
    }
  },
  computed: {
    ...mapState('Search', ['searchView'])
  },
  mounted () {
    setTimeout(() => {
      this.allCategories()
    }, 3000)
  },
  methods: {
    ...mapActions('Search', ['removeData']),
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
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    $route () {
      this.removeData()
    }
  }
}
</script>
