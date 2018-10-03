<template>
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
</template>
<script>
import Container from './Container.vue';
import ConditionsControlPanel from './ConditionsControlPanel.vue';
import TowerDrawer from './TowerDrawer.vue';

const getRandomInt = (start = 0, end = 10) => Math.round(Math.random() * (end - start)) + start;
const getRandomObjValue = obj => obj[getRandomInt(1, Object.keys(obj).length)];

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
    title: 'He (have) a pet dog',
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
      return getRandomObjValue(this.sentences);
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
