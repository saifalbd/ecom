<template>
  <div class="inner">
    <div class="input-box">
      <input
        id="search"
        v-model="model"
        type="text"
        placeholder="Search product here..."
        @keydown="remove"
      >
      <div class="icon-box">
        <BIconSearch />
      </div>
    </div>
    <div class="cart-box" @click="showCart()">
      <BIconCart4 />
      <b-avatar variant="warning" class="avatarIcon" :text="countTxt" />
    </div>
    <ul v-if="show" class="srearchList">
      <li
        v-for="(item, index) in searchItems"
        :key="index"
        @click.stop="to(item)"
      >
        <b-avatar variant="info" :src="url(item.images)" class="mr-3" />
        <span class="mr-auto">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { BIconSearch, BIconCart4 } from 'bootstrap-vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { head } from 'lodash'

export default {
  components: {
    BIconSearch,
    BIconCart4
  },
  data () {
    return {
      show: false,
      count: 0,
      items: [],

      fetchDone: true
    }
  },
  computed: {
    ...mapState('Search', [
      'searchValue',
      'searchCount',
      'searchBusy',
      'searchItems'
    ]),
    ...mapGetters('ShopingCart', ['countCarts', 'totalCartPrices']),
    countTxt () {
      return String(this.countCarts)
    },
    model: {
      set (val) {
        this.set_value(val)
      },
      get () {
        return this.searchValue
      }
    }
  },
  watch: {
    model (val) {
      if (val) {
        this.show = true
        // const obj = { value: val, done: this.done() }
        if (this.fetchDone) {
          this.fetchItems(val)
        }
      }
    }
  },
  methods: {
    to (item) {
      this.$router.push({ name: 'products-slug', params: { slug: item.slug } })
    },
    url (images) {
      return head(images).url
    },
    showCart () {
      this.$store.dispatch('toggleCart', true)
    },
    async fetchItems (search) {
      this.set_busy(true)
      this.fetchDone = false
      try {
        const url = this.$apiUrl(
          'app.item.search',
          {
            search
          },
          false
        )
        const { data } = await this.$axiosWithoutToken.get(url)

        this.set_data(data)
      } catch (error) {
        console.error(error)
        alert('error')
      }
      this.set_busy(false)
      this.fetchDone = true
    },
    dropClick (item) {
      this.dropTxt = item
    },
    remove () {
      this.show = false
    },
    ...mapActions('Search', [
      'searchFetch',
      'set_search_view',
      'set_value',
      'set_data',
      'set_busy'
    ]),
    searchView () {
      this.set_search_view(true)
      this.show = false
    },
    done () {
      return () => {
        this.show = true
        this.fetchDone = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
