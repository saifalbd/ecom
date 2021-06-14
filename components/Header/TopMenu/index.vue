<template>
  <ul id="topMenu" class="top-menu-box">
    <li class="home-link">
      <b-link>
        Home
      </b-link>
    </li>
    <li
      v-for="(m, index) in items"
      :key="index"
      :class="{ 'has-child': m.subItems ? true : false }"
    >
      <b-link>
        {{ m.title }}
      </b-link>

      <ul class="sub-items">
        <li v-for="(sub, i) in m.subItems" :key="i">
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
      items: [
        {
          title: 'Categories',
          subItems: []
        },
        {
          title: 'Vendors',
          subItems: []
        },
        {
          title: 'Brands',
          subItems: []
        },

        {
          title: 'Offers',
          to: {}
        },
        {
          title: 'About us',
          to: {}
        }
      ]
    }
  },
  mounted () {
    this.allCategories()
    this.allVendors()
  },
  methods: {
    async allCategories () {
      try {
        const url = this.$apiUrl('app.category.index', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.items[0].subItems = data.data.map((c) => {
          // let name
          // if (c.childrens_count) {
          //   name = 'categories-category-categories'
          // } else {
          //   name = 'categories-category'
          // }
          const name = 'categories-category'
          const params = { category: c.id }
          const to = { name, params }
          c.to = to
          return c
        })
      } catch (error) {
        console.error(error)
      }
    },
    async allVendors () {
      try {
        const url = this.$apiUrl('app.vendor.index', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.items[1].subItems = data.data.map((c) => {
          const name = 'vendors-vendor'
          c.title = c.name
          const params = { vendor: c.id }
          const to = { name, params }
          c.to = to
          return c
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
