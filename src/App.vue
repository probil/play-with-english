<template>
  <div id="app">
    <FallStack />
  </div>
</template>
<script>
import FallStack from '@/components/exercises/fall-stack/FallStack.vue';

export default {
  components: {
    FallStack,
  },
};
</script>
<style lang="stylus">
body
  min-height 100vh
  min-width 100vw
  padding 0
  margin 0
  background-color: #1d2935
  color #fff

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
