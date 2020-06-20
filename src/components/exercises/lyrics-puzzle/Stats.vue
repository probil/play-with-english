<template>
  <div class="stats">
    <h1 class="text-2xl">Hooray!</h1>
    <p>Your time: {{ stats.time | timeFormat }}</p>
    <button
      type="button"
      class="stats__restart-btn"
      @click="$emit('restart')"
    >Restart</button>
  </div>
</template>
<script>
import timeFormat from '@/filters/timeFormat';

export default {
  props: {
    stats: {
      type: Object,
      required: true,
      validator: (obj) => obj
        && Number.isInteger(obj.time),
    },
  },
  filters: {
    timeFormat,
  },
};
</script>
<style lang="stylus">
.stats
  display flex
  justify-content center
  align-items center
  flex-wrap wrap
  flex-direction column
  height 100vh
  &__pie-chart
    height 450px
    width 450px
  &__restart-btn
    margin-top 22px
    padding 15px 30px
    font-size 1.2rem
    background-color: #42b983;
    color: #fff
    border none
    outline none
    border-radius 10px
    cursor pointer
    &:hover
      background-color: #70cca2
    &:active
      background-color: #3daa79
</style>
