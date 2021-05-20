<template>
  <div>
    <b-sidebar
      v-model="dialog"
      title="Categories"
      class="rd-responsive-menu-sidebar"
      left
      :backdrop="true"
      shadow
    >
      <ul class="rd-res-menu-box">
        <li v-if="user" class="rd-res-menu-item">
          <b-avatar />

          <span class="ml-3">{{ user.name }}</span>
        </li>
        <li v-for="cat in categories" :key="cat.title" class="rd-res-menu-item">
          <b-link
            :to="{
              name: 'categories-category',
              params: { category: cat.id },
              query: { name: cat.title }
            }"
          >
            {{ cat.title }}
          </b-link>
        </li>

        <li class="rd-res-menu-item">
          <b-button
            v-if="!user"
            squared
            block
            variant="light"
            :to="{ name: 'Login' }"
          >
            <BIconUnlock /> <span>Login</span>
          </b-button>

          <b-button
            v-if="user"
            squared
            variant="light"
            :to="{ name: 'Logout' }"
          >
            <!-- @click="$auth.logOut()" -->
            <BIconUnlock /> <span>LogOut</span>
          </b-button>
        </li>
      </ul>

      <!-- ecommerce carts -->

      <!-- ecommerce sarts end -->
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BIconUnlock } from 'bootstrap-vue'
import menus from './internal/topMenus'

export default {
  name: 'ResponsiveMenu',
  components: { BIconUnlock },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      show: true,
      menus
    }
  },
  computed: {
    ...mapState('Auth', {
      user: state => state.user
    }),
    ...mapState(['showResMenu']),

    dialog: {
      get () {
        return this.showResMenu
      },
      set (v) {
        this.$store.dispatch('toggleResMenu', v)
      }
    }
  }
}
</script>
