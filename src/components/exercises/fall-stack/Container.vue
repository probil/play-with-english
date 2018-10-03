<template>
  <div class="container">
    <div
      class="container__inner"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 900,
    },
  },
};
</script>

<style lang="stylus">
.container
  height 100%
  width 100%
  display flex
  align-items center
  justify-content: center
</style>
