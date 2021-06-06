<template>
  <div class="footer">
    <!-- start footer-item -->
    <div class="footer-item">
      <div class="title-box">
        Contact us
      </div>
      <div class="footer-content">
        <ul class="footer-item-list">
          <li v-for="(contact, index) in contacts" :key="index" class="item">
            {{ contact.text }}
          </li>
        </ul>
      </div>
    </div>
    <!-- end footer-item -->
    <!-- start footer-item -->
    <div v-for="(item, index) in links" :key="index" class="footer-item">
      <div class="title-box">
        {{ item.title }}
      </div>
      <div class="footer-content">
        <ul class="footer-item-list">
          <li
            v-for="(link, i) in item.list"
            :key="i"
            class="item"
            :href="link.link"
          >
            <a :href="link.link" target="_blank" rel="noopener noreferrer">
              {{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- end footer-item -->
  </div>
</template>

<script>
import { contacts, links } from './internal/items'
export default {
  data () {
    return {
      contacts: contacts(),
      links: links()
    }
  },
  computed: {},
  created () {},
  methods: {}
}
</script>
