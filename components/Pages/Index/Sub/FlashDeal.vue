<template>
  <b-overlay :show="false" tag="div" class="product-slider">
    <div class="top-bar">
      <h4>{{ name }}</h4>
      <h4 ref="couter" class="mr-2">
        {{ couterDate }}
      </h4>
    </div>

    <div class="product-list" :class="{ horizontal: !isBox, ...breakpoint }">
      <div v-for="(item, index) in items" :key="index" class="product-item">
        <product-card
          :show-category="false"
          class="responsive"
          :item="item"
        />
      </div>
    </div>
  </b-overlay>
</template>

<script>
import { BIconBox, BIconCardList, BIconMinecartLoaded } from 'bootstrap-vue'
import ProductCard from '@/components/Organized/ProductCard.vue'
import ProductCardHorizontal from '@/components/Organized/ProductCardHorizontal.vue'
export default {
  components: {
    ProductCard
    // BIconBox,
    // BIconCardList
  },
  props: {
    name: {
      type: String,
      default: 'Flash Deal'
    },
    items: {
      type: Array,
      required: true
    },
    until: {
      type: String,
      required: true
    },
    settings: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isBox: true,
      couterDate: '',
      primaryOptions: {
        rewind: false,

        gap: '1rem',
        type: 'loop',
        pagination: false,
        autoWidth: true,

        arrows: true,

        isNavigation: false,
        interval: null
      }
    }
  },
  computed: {
    breakpoint () {
      const { breakpoint } = this.settings
      if (!breakpoint) {
        return {}
      }
      const result = {}

      for (const key in breakpoint) {
        result[`${key}-${breakpoint[key]}`] = true
      }

      return result
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.counter()
    })
    // this.$refs.primary.sync(this.$refs.secondary.splide);
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    counter () {
      const untilDate = '2021-08-07 13:15:00'
      const u = new Date(untilDate).getTime()

      this.interval = setInterval(() => {
        const c = this.countDown(u)
        this.$refs.couter.textContent = c
      }, 1000)
    },
    countDown (u) {
      const n = new Date().getTime()
      let dif = u - n
      const expaire = dif < 1
      if (expaire) {
        return '00:00:00:00'
      }
      const oneSec = 1000
      const oneMin = oneSec * 60
      const oneHour = oneMin * 60
      const oneDay = oneHour * 24
      const day = Math.floor(dif / oneDay)
      dif = dif - day * oneDay

      const hour = Math.floor((dif > oneDay ? dif - oneDay : dif) / oneHour)
      dif = dif - hour * oneHour
      const min = Math.floor(dif / oneMin)
      dif = dif - min * oneMin
      const sec = Math.floor(dif / oneSec)
      const isSingle = v => (v < 10 ? `0${v}` : v)
      const str = `${isSingle(day)}:${isSingle(hour)}:${isSingle(
        min
      )}:${isSingle(sec)}`
      return str
    }
  }
}
</script>
