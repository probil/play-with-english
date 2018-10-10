<template>
  <Container>
    <TowerDrawer
      :questions="questions"
      @answer="checkAnswer"
    />
    <ConditionsControlPanel
      :conditions="Object.values(conditions)"
      @answer="checkAnswer"
    />
  </Container>
</template>
<script>
import Vue from 'vue';
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
    id: 1,
    title: 'I (think) she\'s rich',
    answer: 1,
  },
  2: {
    id: 2,
    title: 'I (think) about your plan',
    answer: 2,
  },
  3: {
    id: 3,
    title: 'The milk (taste) awful',
    answer: 1,
  },
  4: {
    id: 4,
    title: 'He (taste) sauce; it might need some salt',
    answer: 2,
  },
  5: {
    id: 5,
    title: 'He (have) a pet dog',
    answer: 1,
  },
  6: {
    id: 6,
    title: 'He\'s (have) dinner now',
    answer: 2,
  },
  7: {
    id: 7,
    title: 'This clothe (feel) like velvet',
    answer: 1,
  },
  8: {
    id: 8,
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
    questions: [],
  }),
  methods: {
    getRandomSentence() {
      return getRandomObjValue(sentences);
    },
    checkAnswer(answerId) {
      if (this.status !== 'started') return;
      const currentIndex = this.questions.findIndex(q => q.userAnswer === null);
      if (currentIndex === undefined || currentIndex === -1) return;
      Vue.set(this.questions[currentIndex], 'userAnswer', answerId);
    },
  },
  mounted() {
    this.questions = [...Array(10).keys()]
      .map(() => ({
        sentence: this.getRandomSentence(),
        conditions: Object.values(tenses),
        userAnswer: null,
      }));
    this.status = 'started';
  },
};
</script>
