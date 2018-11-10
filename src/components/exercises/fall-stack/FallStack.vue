<template>
  <Container>
    <TowerDrawer
      :questions="currentQuestions"
      :wrongAnswersCount="countIncorrect"
      @answer="checkAnswer"
    />
    <ConditionsControlPanel
      :conditions="Object.values(dataset.conditions)"
      @answer="checkAnswer"
    />
  </Container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Container from './Container.vue';
import ConditionsControlPanel from './ConditionsControlPanel.vue';
import TowerDrawer from './TowerDrawer.vue';

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
  }),
  computed: {
    ...mapGetters('fallStack', [
      'currentQuestions',
      'isFinished',
      'countIncorrect',
      'countUnanswered',
      'countCorrect',
    ]),
  },
  methods: {
    ...mapActions('fallStack', ['start', 'setAnswer']),
    checkAnswer(answerId) {
      if (this.status !== 'started') return;
      this.setAnswer(answerId);
    },
  },
  mounted() {
    this.start(this.dataset);
    this.status = 'started';
  },
  watch: {
    isFinished(value, oldValue) {
      if (value === oldValue) return;
      if (this.status !== 'started') return;
      if (value === true && oldValue === false) {
        this.$emit('game:finished', {
          correct: this.countCorrect,
          incorrect: this.countIncorrect,
          unanswered: this.countUnanswered,
        });
      }
    },
  },
};
</script>
