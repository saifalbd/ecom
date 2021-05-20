<template>
  <b-row class="p-0 m-0 headerBox">
    <top-bar>
      <bottom-bar :categories="categories" />
    </top-bar>
    <middle-bar :categories="categories" />
  </b-row>
</template>

<script>
import BottomBar from './BottomBar.vue'
import MiddleBar from './MiddleBar.vue'
import TopBar from './TopBar.vue'

export default {
  components: {
    TopBar,
    MiddleBar,
    BottomBar
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
