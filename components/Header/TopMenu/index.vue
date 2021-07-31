<template>
  <ul id="topMenu" class="top-menu-box">
    <li class="home-link">
      <b-link>
        Home
      </b-link>
    </li>
    <li
      v-for="(m, index) in menus"
      :key="index"
      :class="{ 'has-child': m.sub_items ? true : false }"
    >
      <b-link :to="m.to">
        {{ m.title }}
      </b-link>

      <ul class="sub-items">
        <li v-for="(sub, i) in m.sub_items" :key="i">
          <b-avatar v-if="sub.src" size="sm" class="mr-1" :src="sub.src" />
          <b-link :to="sub.to">
            {{ sub.title }}
          </b-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  mounted () {
    this.topMenus()
  },
  methods: {
    async topMenus () {
      try {
        const url = this.$apiUrl('app.topMenus', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.menus = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
