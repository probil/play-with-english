<template>
  <div class="get-ready">
    <h3>Get ready</h3>
    <div
      class="get-ready__wrapper"
      :style="{
        width: `${circleSize}px`,
        height: `${circleSize}px`
      }"
    >
      <div class="get-ready__countdown">{{ countdown }}</div>
      <svg
        class="get-ready__svg"
        :width="circleSize"
        :height="circleSize"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="get-ready__circle"
          :r="radius - lineWidth"
          :cy="radius"
          :cx="radius"
          :stroke-width="lineWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashOffset"
          stroke-linecap="round"
          stroke="#fff"
          fill="none"
        ></circle>
        <circle
          class="get-ready__dots"
          :r="radius - lineWidth"
          :cy="radius"
          :cx="radius"
          stroke="#fff"
          stroke-dasharray="2 10"
          stroke-linecap="round"
          fill="none"
        ></circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 5,
      validate: val => val > 0 && Number.isInteger(val),
    },
    lineWidth: {
      type: Number,
      default: 4,
    },
    circleSize: {
      type: Number,
      default: 160,
    },
  },
  data: () => ({
    countdown: 0,
  }),
  computed: {
    radius() {
      return this.circleSize / 2;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    strokeDashOffset() {
      const progress = (this.countdown / this.time);
      const absProgress = progress < 0 ? 0 : progress;
      return this.circumference * (1 - absProgress);
    },
  },
  mounted() {
    this.countdown = this.time;
    const fn = () => {
      if (this.countdown <= 1) {
        this.$emit('ready');
        clearInterval(this.$interval);
      }
      this.countdown -= 1;
    };
    this.$interval = setInterval(fn, 1000);
  },
};
</script>
<style lang="stylus" scoped>
.get-ready
  font-size 1.5rem
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  &__svg
    position absolute
    top 0
    left 0
    transform: rotateY(-180deg) rotateZ(-90deg);
  &__circle
    // transition: stroke-dashoffset 1s linear;
  &__countdown
    position relative
    font-size 2rem
  &__wrapper
    position relative
    display flex
    justify-content center
    align-items center
</style>
