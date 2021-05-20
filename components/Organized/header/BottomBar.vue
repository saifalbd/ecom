<template>
  <b-col cols="8">
    <b-row align-v="center" align-h="center">
      <!-- <b-col>
            <drop-categories :categories="categories" :min-width="150"></drop-categories>

        </b-col> -->
      <b-col class="p-0">
        <b-button-group>
          <b-button
            v-for="(item, index) in menus"
            :key="index"
            squared
            size="sm"
            variant="warning"
            class="m-1 text-nowrap"
            :to="item.to"
          >
            {{ item.title }}
          </b-button>
        </b-button-group>
      </b-col>
      <b-col />
    </b-row>
  </b-col>
</template>

<script>
import menus from './internal/topMenus.js'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      menus
    }
  }
}
</script>
