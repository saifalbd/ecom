<template>
  <ul id="topMenu" class="top-menu-box">
    <li v-for="(m, index) in items" :key="index" class="has-child">
      <b-link>
        {{ m }}
      </b-link>

      <ul class="sub-items">
        <li v-for="(sub, i) in subItems" :key="i">
          <b-link>
            {{ m }}
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
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop'
      ],
      subItems: [
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop',
        'Tablet',
        'Camera',
        'Mobile',
        'Laptop'
      ]
    }
  },
  mounted () {
    // this.menusOpen()
  },
  methods: {
    hideOthers (items, i) {
      for (let index = 0; index < items.length; index++) {
        if (index !== i) {
          items[index].querySelector('.sub-items').classList.remove('show')
        }
      }
    },
    menusOpen () {
      const menu = document.getElementById('topMenu')
      const items = menu.querySelectorAll('.has-child')
      for (let index = 0; index < items.length; index++) {
        items[index].querySelector('a').addEventListener('mouseover', (event) => {
          this.hideOthers(items, index)
          items[index].querySelector('.sub-items').classList.add('show')
        })
      }
    }
  }
}
</script>
