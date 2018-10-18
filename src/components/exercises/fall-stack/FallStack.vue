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
    numberOfQuestions: {
      type: Number,
      default: 15,
      validator: val => Number.isInteger(val) && val > 0 && val <= 50,
    },
    dataset: {
      type: Object,
      required: true,
      validate: val => val && val.questions && val.conditions,
    },
  },
  data: () => ({
    status: '',
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
      if (currentIndex === this.numberOfQuestions - 1) {
        const correct = this.questions.filter(q => q.sentence.answer === q.userAnswer).length;
        const unanswered = this.questions.filter(q => q.userAnswer === 0).length;
        const incorrect = this.questions.length - correct - unanswered;
        this.$emit('game:finished', { correct, incorrect, unanswered });
      }
    },
  },
  mounted() {
    this.questions = [...Array(this.numberOfQuestions).keys()]
      .map(() => ({
        sentence: this.getRandomSentence(),
        conditions: Object.values(this.dataset.conditions),
        userAnswer: null,
      }));
    this.status = 'started';
  },
};
</script>
