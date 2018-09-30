<template>
  <div id="app">
    <Container>
      <TowerDrawer
        v-if="currentSentence"
        :question="currentSentence"
      />
      <ConditionsControlPanel
        :conditions="Object.values(conditions)"
        @answer="checkAnswer"
      />
    </Container>
  </div>
</template>
<script>
import Container from '@/components/Container.vue';
import ConditionsControlPanel from '@/components/ConditionsControlPanel.vue';
import TowerDrawer from '@/components/TowerDrawer.vue';

const getRandomInt = (start = 0, end = 10) => Math.round(Math.random() * (end - start)) + start;

export default {
  components: {
    Container,
    ConditionsControlPanel,
    TowerDrawer,
  },
  data: () => ({
    conditions: tenses,
    sentences,
    currentSentence: null,
  }),
  methods: {
    getRandomSentence() {
      return this.sentences[getRandomInt(0, this.sentences.length)];
    },
    checkAnswer(answerId) {
      console.log('The answer is', answerId === this.currentSentence.answer ? ' correct' : 'incorrect');
    },
  },
  mounted() {
    this.currentSentence = this.getRandomSentence();
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
