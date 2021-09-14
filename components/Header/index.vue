<template>
  <div id="header" class="header relative">
    <div class="top">
      <div class="sm-only-box">
        <div class="left">
          <button class="menu-button" @click="menuOpen = !menuOpen">
            <BIconMenuButton />
          </button>
          <LogoBox />
        </div>
        <div class="right">
          <Account />
        </div>
      </div>
    </div>
    <div class="middle">
      <LogoBox />
      <div class="menu-open-box">
        <button class="menu-button" @click="menuOpen = !menuOpen">
          <BIconMenuButton />
        </button>
      </div>

      <div class="center-box">
        <CenterBox />
      </div>
      <div class="right-box">
        <div class="inner">
          <Account />
        </div>
      </div>
    </div>
    <div class="bottom" :class="{ show: menuOpen }">
      <b-button
        class="close-button"
        variant="danger"
        @click="menuOpen = !menuOpen"
      >
        X
      </b-button>
      <TopMenu />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */ /* eslint-disable no-undef */
import { BIconMenuButton } from 'bootstrap-vue'

import { mapGetters } from 'vuex'
import Account from './sub/Account.vue'
import LogoBox from './sub/LogoBox.vue'
import TopMenu from './TopMenu/index.vue'
import CenterBox from './sub/CenterBox.vue'
export default {
  components: {
    BIconMenuButton,
    CenterBox,
    TopMenu,
    Account,
    LogoBox
  },
  data () {
    return {
      logo: null,
      menuOpen: false
    }
  },
  computed: {
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices']),

    countTxt () {
      return String(this.countCarts)
    },
    isLogin () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  },
  created () {},
  methods: {
    showCart () {
      this.$store.dispatch('toggleCart', true)
    },
    menuToggle () {}
  }
}
</script>
