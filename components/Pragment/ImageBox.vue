<template>
  <b-aspect :aspect="aspect">
    <div class="image-box" :style="`background-image: url('${placeholder}')`">
      <div v-if="wantLove" class="is-love" :class="{ isLoved }">
        <slot name="want-love">
          <BIconHeartFill />
        </slot>
      </div>
      <div v-if="isHover" class="img-hover">
        <slot />
      </div>
      <!--  :src="img.url"
           -->
      <b-img-lazy
        :class="imgClass"
        :thumbnail="thumbnail"
        :fluid="fluid"
        :blank-src="placeholder"
        :src="img.url"
        :alt="img.name"
      />
    </div>
  </b-aspect>
</template>

<script>
import { head, shuffle, has } from 'lodash'
import { BIconHeartFill } from 'bootstrap-vue'
import placeholder from '@/assets/image-placeholder.svg'
export default {
  name: 'ImageBox',
  components: {
    BIconHeartFill
  },
  inheritAttrs: true,
  props: {
    aspect: {
      type: [Number, String],
      default: 1
    },

    thumbnail: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    isHover: {
      type: Boolean,
      default: true
    },
    isSlide: {
      type: Boolean,
      default: false
    },
    wantLove: {
      type: Boolean,
      default: false
    },
    isLoved: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      required: true,
      validator (arr) {
        return !(arr.findIndex(img => !(img.url)) > -1)
      }
    }

    // maxHeight:{
    //     type:String,
    //     default:null,
    // }
  },
  data () {
    return {
      img: {},
      placeholder
    }
  },
  computed: {
    imgClass () {
      const att = this.$attrs
      if (has(att, 'class')) {
        return att.classs
      } else {
        return ''
      }
    }
  },
  watch: {
    images: {
      deep: true,
      handler (arr) {
        this.img = this.head(arr)
      }
    }
  },
  mounted () {},
  created () {
    this.img = this.head(this.images)
  },
  methods: {
    head (images) {
      const img = head(images)
      return img
    },
    randomImg () {
      const arr = shuffle(this.images)
      this.img = this.head(arr)
    },
    doRandom () {
      const delay = 1000 * 10
      if (this.images.length > 1) {
        setTimeout(() => {
          if (this.isSlide) {
            setInterval(() => {
              this.randomImg()
            }, delay)
          }
        }, delay)
      }
    }
  }
}
</script>
