<template>
  <div class="review">
    <b-col cols="12" class="mt-3">
      <div v-for="(r, i) in rateMix" :key="i" class="rating-line">
        <div class="star">
          <b-form-rating
            v-model="r.rate"
            readonly
            no-border
            size="sm"
            color="indigo"
          />
        </div>
        <div class="count">
          {{ r.count }}
        </div>
        <div class="percent">
          <div>
            <b-progress
              :value="r.percent"
              show-value
              :max="100"
              variant="warning"
            />
          </div>
        </div>
      </div>
    </b-col>
    <b-media
      v-for="(r, i) in reviews"
      :key="i"
      right-align
      vertical-align="center"
      class="mb-2"
    >
      <template #aside>
        <b-img
          v-if="r.user.thumbnail"
          :src="r.user.thumbnail"
          width="50"
          alt="placeholder"
        />
        <b-img v-else blank blank-color="#ccc" width="50" alt="placeholder" />
      </template>
      <h5 class="mt-0 mb-1">
        {{ r.user.name }}
      </h5>
      <p class="mb-0">
        {{ r.body }}
      </p>
    </b-media>

    <b-overlay v-if="hasLogin" :show="busy" tag="div" class="row">
      <b-col cols="12" class="mt-3">
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        />
      </b-col>
      <b-col cols="12" class="text-right mt-2">
        <b-btn dark squared small @click.stop="submit">
          submit
        </b-btn>
      </b-col>
    </b-overlay>
  </div>
</template>

<script>
export default {
  props: {
    addRating: {
      type: [Boolean, Object],
      default: false
    }
  },
  data () {
    return {
      text: this.$isDev('this is dummy comments', ''),
      busy: false,
      reviews: [],
      ratings: []
    }
  },
  computed: {
    hasLogin () {
      return this.$auth.loggedIn
    },
    rateMix () {
      const result = []
      const ratings = this.ratings
      const totalLnt = ratings.length
      if (ratings.length) {
        for (let r = 1; r <= 5; r++) {
          const arr = ratings.filter(el => el.rate === r).map(r => r.rate)
          const count = arr.length
          const rate = r
          const percent = (100 / totalLnt) * count
          result.push({ count, rate, percent })
        }
      }

      return result.filter(r => r.count)
    }
  },
  watch: {
    addRating: {
      deep: true,
      handler (val) {
        if (typeof val === 'object') {
          this.ratings.push(val)
        }
      }
    }
  },
  mounted () {
    this.fetchReviews()
    this.fetchRatings()
  },
  methods: {
    async fetchReviews () {
      try {
        this.busy = true
        const item = this.$route.params.slug
        const url = this.$apiUrl('app.item.review.index', { item }, false)
        const body = this.text
        const { data } = await this.$axios.get(url)
        this.reviews = data.data
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    },
    async fetchRatings () {
      try {
        this.busy = true
        const item = this.$route.params.slug
        const url = this.$apiUrl('app.item.rating.index', { item }, false)
        const body = this.text
        const { data } = await this.$axios.get(url)
        this.ratings = data
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    },
    async submit () {
      try {
        this.busy = true
        const item = this.$route.params.slug
        const url = this.$apiUrl('app.item.review.store', { item }, false)
        const body = this.text
        const { data } = await this.$authAxios(this.$auth).post(url, { body })
        this.reviews.push(data)
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>
