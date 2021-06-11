<template>
  <b-row class="p-0 m-0 headerBox">
    <top-bar>
      <!-- <bottom-bar :categories="categories" /> -->
    </top-bar>
    <middle-bar :categories="categories" />
    <b-col>
      <TopMenu />
    </b-col>
  </b-row>
</template>

<script>
import TopMenu from '../TopMenu/index.vue'
import BottomBar from './BottomBar.vue'
import MiddleBar from './MiddleBar.vue'
import TopBar from './TopBar.vue'

export default {
  components: {
    TopBar,
    MiddleBar,
    // BottomBar,
    TopMenu
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isLogged: true
    }
  },
  created () {},
  methods: {}
}
</script>
