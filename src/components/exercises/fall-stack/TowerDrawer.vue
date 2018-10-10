<template>
  <div class="tower-drawer" ref="container">
    <StackBlock
      v-for="(question, $index) in stackQuestions"
      :key="`question-key-${question.sentence.id}-${$index}`"
      :meta="question"
      :stack-height="stackHeight"
      @felt="$emit('answer', 0)"
    />
  </div>
</template>

<script>
import StackBlock from './StackBlock.vue';

const stackBlockPadding = 10;
const stackBlockHeight = 16;

export default {
  components: {
    StackBlock,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    answeredQuestions() {
      return this.questions
        .filter(q => q.userAnswer !== null);
    },
    currentQuestion() {
      return this.questions.find(q => q.userAnswer === null);
    },
    stackQuestions() {
      if (this.currentQuestion) {
        return [...this.answeredQuestions, this.currentQuestion];
      }
      return this.answeredQuestions;
    },
    wrongAnswersCount() {
      return this.answeredQuestions
        .filter(q => q.userAnswer !== q.sentence.answer)
        .length;
    },
    stackHeight() {
      return this.wrongAnswersCount * (stackBlockPadding + stackBlockPadding + stackBlockHeight);
    },
  },
};
</script>


<style lang="stylus">
.tower-drawer
  width 100%
  height 800px
  display flex
  align-items flex-start
  justify-content center
  position relative
  overflow hidden
  outline 1px solid #2c3e50
</style>
