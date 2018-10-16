<template>
  <Container>
    <TowerDrawer
      :questions="questions"
      @answer="checkAnswer"
    />
    <ConditionsControlPanel
      :conditions="Object.values(dataset.conditions)"
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

export default {
  components: {
    Container,
    ConditionsControlPanel,
    TowerDrawer,
  },
  props: {
    dataset: {
      type: Object,
      required: true,
      validate: val => val && val.questions && val.conditions,
    },
  },
  data: () => ({
    questions: [],
  }),
  methods: {
    getRandomSentence() {
      return getRandomObjValue(this.dataset.questions);
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
        conditions: Object.values(this.dataset.conditions),
        userAnswer: null,
      }));
    this.status = 'started';
  },
};
</script>
