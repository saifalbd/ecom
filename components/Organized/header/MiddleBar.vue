<template>
  <b-col cols="12 rd-middle-bar">
    <b-row no-gutters align-v="center" align-h="center">
      <b-col cols="auto" class="p-0">
        <search-box-bar :categories="categories">
          <template slot="leftButtton">
            <b-button variant="dark" class="d-sm-none" @click="showResMenu()">
              <BIconMenuButton />
            </b-button>
          </template>

          <b-button
            squared
            variant="light"
            class="shopIconButton pr-3"
            @click="showCart()"
          >
            <BIconShop />
            <b-avatar
              variant="warning"
              size="sm"
              class="avatarIcon"
              :text="countTxt"
            />
            {{ totalCartPrices }}
          </b-button>
          <!-- start -->

          <!-- end -->
        </search-box-bar>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { BIconShop, BIconMenuButton } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import SearchBoxBar from './SearchBoxBar.vue'

export default {
  components: {
    SearchBoxBar,
    BIconShop,
    BIconMenuButton
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices']),
    countTxt () {
      return String(this.countCarts)
    }
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
