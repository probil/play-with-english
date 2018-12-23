<template>
  <div>
    <GetReady
      v-if="state === 'init'"
      :time="3"
      @ready="state = 'started'"
    />
    <FallStack
      v-if="state === 'started'"
      :dataset="dataset"
      @game:finished="displayStats"
    />
    <StatsPage
      v-if="state === 'stats'"
      :stats="lastStats"
      @restart="state = 'init'"
    />
  </div>
</template>
<script>
import FallStack from '@/components/exercises/fall-stack/FallStack.vue';
import GetReady from '@/components/exercises/fall-stack/GetReady.vue';
import StatsPage from '@/components/exercises/fall-stack/StatsPage.vue';
import { questions, conditions } from '@/datasets/PresentSimpleContinuous';

export default {
  components: {
    FallStack,
    GetReady,
    StatsPage,
  },
  data: () => ({
    dataset: {
      questions,
      conditions,
    },
    state: 'init',
    lastStats: null,
  }),
  methods: {
    displayStats(stats) {
      this.lastStats = stats;
      this.state = 'stats';
    },
  },
};
</script>
