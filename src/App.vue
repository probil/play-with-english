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

const tenses = {
  1: {
    id: 1,
    name: 'Present Simple',
  },
  2: {
    id: 2,
    name: 'Present Continuous',
  },
};

const sentences = {
  1: {
    title: 'I (think) she\'s rich',
    answer: 1,
  },
  2: {
    title: 'I (think) about your plan',
    answer: 2,
  },
  3: {
    title: 'The milk (taste) awful',
    answer: 1,
  },
  4: {
    title: 'He (taste) sauce; it might need some salt',
    answer: 2,
  },
  5: {
    title:
      'He (have) a pet dog',
    answer: 1,
  },
  6: {
    title: 'He\'s (have) dinner now',
    answer: 2,
  },
  7: {
    title: 'This clothe (feel) like velvet',
    answer: 1,
  },
  8: {
    title: 'She (feel) her way in the dark',
    answer: 2,
  },
};

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
