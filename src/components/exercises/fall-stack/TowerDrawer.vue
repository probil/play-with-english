<template>
  <div class="tower-drawer" ref="container">
    <StackBlock
      v-for="(question, $index) in stackQuestions"
      :key="`question-key-${question.id}-${$index}`"
      :question="question"
      :user-answer="getAnswerByIndex($index)"
      :conditions="conditions"
      :stack-height="stackHeight"
      @felt="$emit('answer', 0)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    wrongAnswersCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('fallStack', [
      'currentQuestion',
      'currentAnsweredQuestions',
      'getAnswerByIndex',
      'conditions',
    ]),
    stackQuestions() {
      if (this.currentQuestion) {
        return [...this.currentAnsweredQuestions, this.currentQuestion];
      }
      return this.currentAnsweredQuestions;
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
