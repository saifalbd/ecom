<template>
  <b-overlay :show="busy" tag="div" class="product-single-view">
    <div v-if="item" class="item-details">
      <b-row>
        <b-col cols="12" md="6">
          <no-ssr>
            <image-slider :images="item.images" />
          </no-ssr>
        </b-col>
        <b-col>
          <no-ssr>
            <item-info :item="item" />
          </no-ssr>
        </b-col>
      </b-row>
    </div>
    <!-- <div class="rd-item-summary"  v-if="item">
        <b-card no-body>
            <b-tabs
                card
                fill
                nav-wrapper-class="h3 font-weight-bold text-success card-title">
                <b-tab
                    title="Summary"
                    active>
                    <b-card-text>
                        <specifications :items="item.specifications"></specifications>

                    </b-card-text>
                </b-tab>
                <b-tab title="Description">
                    <b-card-text>
                             {{item.description}}
                    </b-card-text>
                </b-tab>
                   <b-tab title="Review">
                    <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>

    </div> -->
  </b-overlay>
</template>

<script>
import ImageSlider from './Sub/ImageSlider.vue'
import ItemInfo from './Sub/ItemInfo.vue'

// import Specifications from './Sub/Specifications.vue'

export default {
  components: {
    ImageSlider,
    ItemInfo
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
      busy: false
    }
  }
}
</script>
