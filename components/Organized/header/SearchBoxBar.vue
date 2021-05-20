<template>
  <div class="searchPanel">
    <b-input-group>
      <template #prepend>
        <b-button-group>
          <slot name="leftButtton" />

          <drop-categories :categories="categories" />
        </b-button-group>
      </template>
      <b-form-input
        v-model="model"
        placeholder="Search Here"
        @keydown="remove"
      />

      <b-input-group-append class="search-icon">
        <b-button squared variant="warning">
          <BIconSearch />
        </b-button>
      </b-input-group-append>

      <template #append>
        <slot />
      </template>
    </b-input-group>
    <ul v-if="show" class="srearchList">
      <li v-if="searchCount">
        {{ searchCount }} items found for "{{ model }}"
        <b-button link variant="outline-primary" @click="searchView">
          show items
        </b-button>
      </li>
      <li v-if="searchBusy && !searchCount">
        wait ...
      </li>
    </ul>
  </div>
</template>

<script>
import { BIconSearch } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import DropCategories from './DropCategories.vue'

export default {
  name: 'SearchBoxBar',
  components: {
    BIconSearch,
    DropCategories
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      show: false,
      count: 0,
      items: [],

      fetchDone: false
    }
  },
  computed: {
    ...mapState('Search', ['searchValue', 'searchCount', 'searchBusy']),
    model: {
      set (val) {
        this.set_value(val)
      },
      get () {
        return this.searchValue
      }
    }
  },
  methods: {
    dropClick (item) {
      this.dropTxt = item
    },
    remove () {
      this.show = false
    },
    ...mapActions('Search', ['searchFetch', 'set_search_view', 'set_value']),
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
  },
  watch: {
    model (val) {
      if (val) {
        this.show = true

        const obj = { value: val, done: this.done() }
        this.searchFetch(obj)
      }
    }
  }
}
</script>
