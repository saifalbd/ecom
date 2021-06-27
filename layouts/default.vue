<template>
  <div class="guest-layout hind-siliguri-font">
    <client-only>
      <Header :categories="categories" />
    </client-only>
    <b-container fluid class="relative">
      <div class="page" :class="{ hide: searchView }">
        <Nuxt keep-alive />
      </div>
      <div class="search-layout" :class="{ show: searchView }">
        <SearchView />
      </div>
    </b-container>
    <client-only>
      <AppFooter />
    </client-only>
    <client-only>
      <CartSidebar />
    </client-only>
  </div>
</template>

<script>
import HeadBox from '@/components/Organized/header/HeadBox.vue'
import Header from '@/components/Header/index.vue'
import AppFooter from '@/components/Organized/AppFooter/AppFooter.vue'
import CartSidebar from '@/components/Organized/CartSidebar.vue'
import { restApi } from '@/plugins/restApi/index'
import { mapState, mapActions } from 'vuex'
import SearchView from '@/components/Organized/SearchView.vue'
export default {
  fetchOnServer: true,
  components: { Header, AppFooter, CartSidebar, SearchView },
  data () {
    return {
      categories: []
    }
  },
  computed: {
    ...mapState('Search', ['searchView'])
  },

  methods: {
    ...mapActions('Search', ['removeData']),
    // async allCategories () {
    //   try {
    //     const { data } = await restApi
    //       .ctx(this)
    //       .getIs()
    //       .categories()
    //     this.categories = data.data
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    myFunction (header, sticky) {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mounted () {
    this.$nextTick(() => {
      const header = document.getElementById('header')
      const sticky = header.offsetTop
      window.onscroll = () => {
        this.myFunction(header, sticky)
      }
    })
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    $route () {
      this.removeData()
    }
  }
}
</script>
