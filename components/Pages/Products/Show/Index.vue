<template>
  <b-overlay :show="busy" tag="div" class="product-single-view">
    <div v-if="item" class="item-details">
      <b-row>
        <b-col cols="12" md="6">
          <client-only>
            <image-slider :images="item.images" />
          </client-only>
        </b-col>
        <b-col>
          <client-only>
            <item-info :item="item" @rating="newRating = $event" />
          </client-only>
        </b-col>
      </b-row>
    </div>
    <div v-if="item" class="rd-item-summary">
      <client-only>
        <b-card no-body>
          <b-tabs
            card
            fill
            nav-wrapper-class="h3 font-weight-bold text-success card-title"
          >
            <b-tab title="Summary" active>
              <b-card-text>
                <specifications :items="item.specification" />
              </b-card-text>
            </b-tab>
            <b-tab title="Description">
              <b-card-text>
                {{ item.description }}
              </b-card-text>
            </b-tab>
            <b-tab title="Review">
              <b-card-text>
                <Review :add-rating="newRating" />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </client-only>
    </div>
  </b-overlay>
</template>

<script>
import ImageSlider from './Sub/ImageSlider.vue'
import ItemInfo from './Sub/ItemInfo.vue'
import Review from './Sub/Review.vue'

import Specifications from './Sub/Specifications.vue'

export default {
  components: {
    ImageSlider,
    ItemInfo,
    Specifications,
    Review
  },
  props: {
    name: {
      type: [String],
      default () {
        return 'product name'
      }
    },
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      busy: false,
      newRating: false
    }
  }
}
</script>
