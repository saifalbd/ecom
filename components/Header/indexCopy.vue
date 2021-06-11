<template>
  <div class="header">
    <div class="top">
      dldk
    </div>
    <div class="middle">
      <div class="logo-box">
        <img v-if="logo" :src="logo.url">
      </div>
      <div class="center-box">
        <div class="inner">
          <div class="input-box">
            <input type="text" placeholder="search product here...">
            <div class="icon-box">
              <BIconSearch />
            </div>
          </div>
          <div class="cart-box" @click="showCart()">
            <BIconShop />
            <b-avatar variant="warning" class="avatarIcon" :text="countTxt" />
            <!-- <div>
              {{ totalCartPrices }}
            </div> -->
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="inner">
          <b-button-group size="sm">
            <b-button
              v-if="!user"
              squared
              variant="light"
              :to="{ name: 'login' }"
            >
              <BIconUnlock /> <span>Login</span>
            </b-button>

            <b-button
              v-if="user"
              squared
              variant="light"
              :to="{ name: 'index' }"
            >
              <b-avatar
                v-if="user && user.image"
                size="sm"
                variant="info"
                :src="user.image.url"
              />
              <!-- <b-icon-person-fill></b-icon-person-fill> -->

              <span class="d-none d-md-inline ml-2">{{ user.name }}</span>
            </b-button>
            <b-button
              v-if="user"
              squared
              variant="light"
              :to="{ name: 'logout' }"
            >
              <!-- @click="$auth.logOut()" -->
              <BIconLock />
              <span class="d-none d-md-inline">LogOut</span>
            </b-button>
          </b-button-group>
        </div>
      </div>
    </div>
    <div class="bottom">
      <TopMenu />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */ /* eslint-disable no-undef */
import { BIconSearch, BIconShop, BIconLock, BIconUnlock } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import TopMenu from './TopMenu/index.vue'
export default {
  components: {
    BIconSearch,
    BIconShop,
    BIconLock,
    BIconUnlock,
    TopMenu
  },
  data () {
    return {
      logo: null
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
  created () {
    this.logo = app.logo
  },
  methods: {
    showCart () {
      this.$store.dispatch('toggleCart', true)
    },
    showResMenu () {
      this.$store.dispatch('toggleResMenu', true)
    }
  }
}
</script>
