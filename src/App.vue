<template>
  <div id="app">
    <GetReady
      v-if="state === 'init'"
      :time="3"
      @ready="state = 'started'"
    />
    <FallStack
      v-if="state === 'started'"
      :dataset="dataset"
      @game:finished="state = 'init'"
    />
  </div>
</template>
<script>
import FallStack from '@/components/exercises/fall-stack/FallStack.vue';
import GetReady from '@/components/GetReady.vue';
import { questions, conditions } from '@/datasets/PresentSimpleContinuous';

export default {
  components: {
    FallStack,
    GetReady,
  },
  data: () => ({
    dataset: {
      questions,
      conditions,
    },
    state: 'init',
  }),
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
