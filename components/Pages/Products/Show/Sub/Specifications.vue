<template>
  <div class="specifications">
    <ul v-for="item in items" :key="item.title">
      <li>
        {{ item.title }}
      </li>
      <li>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </li>
      <li>
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.specifications {
  ul {
    display: flex;
    font-weight: bold;

    li {
      list-style: none;
      padding: 0.5rem 1rem;
      text-transform: capitalize;
    }

    border-bottom: 0.02rem dotted rebeccapurple;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
