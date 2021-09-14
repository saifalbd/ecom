<template>
  <div class="guest-layout hind-siliguri-font relative">
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
    <div v-show="searchCount" :style="overlay" @click="overlaOff" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '@/components/Header/index.vue'
import AppFooter from '@/components/Organized/AppFooter/AppFooter.vue'
import CartSidebar from '@/components/Organized/CartSidebar.vue'
import SearchView from '@/components/Organized/SearchView.vue'

export default {
  fetchOnServer: true,
  components: { Header, AppFooter, CartSidebar, SearchView },
  data () {
    return {
      categories: [],
      showOverly: false,
      overlay: {
        backgroundColor: 'rgba(103, 58, 183,0.50)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }
    }
  },
  computed: {
    ...mapState('Search', ['searchView', 'searchCount'])
  },

  methods: {
    ...mapActions('Search', ['removeData']),
    overlaOff () {
      this.removeData()
      this.showOverly = false
    },
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
      if (header) {
        const sticky = header.offsetTop
        window.onscroll = () => {
          this.myFunction(header, sticky)
        }
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
