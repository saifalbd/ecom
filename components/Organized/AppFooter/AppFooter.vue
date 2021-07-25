<template>
  <div class="footer">
    <div class="top">
      <div class="subscribe">
        <div class="text">
          Subscribe To Our Newsletter
        </div>
        <div class="input-box">
          <input placeholder="please type your phone number">
          <button class="label">
            Subscribe
          </button>
        </div>
      </div>
      <div class="socials">
        <div v-for="(item, index) in socials" :key="index" class="item">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="item.name"
          >
            <svg style="width:30px;height:30px" viewBox="0 0 24 24">
              <path fill="currentColor" :d="item.icon" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="middle">
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
  </div>
</template>

<script>
import { contacts, links } from './internal/items'
export default {
  data () {
    return {
      contacts: contacts(),
      links: links(),
      socials: []
    }
  },
  computed: {},
  created () {
    this.fetchSocials()
  },
  methods: {
    async fetchSocials () {
      try {
        const url = this.$apiUrl('app.socialLinks', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.socials = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
