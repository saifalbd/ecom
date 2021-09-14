<template>
  <a
  :href="item.link"
    class="card offer-card"
  >

  <img
     :src="item.thumbnail.url"
     alt="Card image"
     height="150"
     class="card-img-top">
    <div class="card-body">
      <!----><!---->
      <h4
        tag="div"
        class="card-title"
        style="color: black;"
        v-text="item.title"
      />
      <h6 tag="div" class="card-subtitle text-muted" v-text="item.subtitle" />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    radio: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
