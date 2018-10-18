<template>
  <div class="stats-page">
    <h1>Statistics</h1>
    <StatsChart :stats="stats" class="stats-page__pie-chart"/>
    <button
      type="button"
      class="stats-page__restart-btn"
      @click="$emit('restart')"
    >Restart</button>
  </div>
</template>
<script>
import StatsChart from './StatsChart';

export default {
  components: {
    StatsChart,
  },
  props: {
    stats: {
      type: Object,
      required: true,
      validator: obj => obj && obj.correct && obj.incorrect,
    },
  },
};
</script>
<style lang="stylus">
.stats-page
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
