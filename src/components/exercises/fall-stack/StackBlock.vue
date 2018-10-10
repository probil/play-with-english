<template>
  <p class="stack-block">
    {{ title }}
  </p>
</template>
<script>
import { Tween, autoPlay } from 'es6-tween';

const fallAnimationDuration = 20000;
const answerAnimationDuration = 500;

autoPlay(true);

export default {
  props: {
    containerHeight: {
      type: Number,
      default: 800,
    },
    containerWidth: {
      type: Number,
      default: 800,
    },
    stackHeight: {
      type: Number,
      default: 0,
    },
    meta: {
      type: Object,
    },
  },
  data: () => ({
    x: 0,
    y: 0,
    $tween: null,
  }),
  computed: {
    title() {
      return this.meta.sentence.title;
    },
    isAnswered() {
      return typeof this.meta.userAnswer === 'number';
    },
    isAnsweredCorrectly() {
      return this.meta.userAnswer === this.meta.sentence.answer;
    },
    isRightAnswerCorrect() {
      return this.meta.sentence.answer === this.meta.conditions[0].id;
    },
    halfOfWidth() {
      return Math.round(this.$el.scrollWidth / 2);
    },
  },
  methods: {
    setPosition({ x, y }) {
      this.x = x;
      this.y = y;
      this.$el.style.transform = `translate(${x}px, ${y}px)`;
    },
    getPositionBasedOnAnswer() {
      const answerToPositionMap = {
        '00': this.rightOutsidePosition,
        '01': this.leftOutsidePosition,
        10: this.leftStackPosition,
        11: this.rightStackPosition,
      };
      const positionKey = `${this.isAnsweredCorrectly ? 0 : 1}${this.isRightAnswerCorrect ? 1 : 0}`;
      return answerToPositionMap[positionKey]();
    },

    rightStackPosition() {
      return {
        y: this.containerHeight - Math.max(this.stackHeight, this.$el.scrollHeight),
        x: this.halfOfWidth,
      };
    },
    leftStackPosition() {
      return {
        y: this.containerHeight - Math.max(this.stackHeight, this.$el.scrollHeight),
        x: -this.halfOfWidth,
      };
    },
    rightOutsidePosition() {
      return {
        y: this.y + 200,
        x: Math.round(this.containerWidth / 2) + this.$el.scrollWidth,
      };
    },
    leftOutsidePosition() {
      return {
        y: this.y + 200,
        x: -(Math.round(this.containerWidth / 2) + this.$el.scrollWidth),
      };
    },
  },
  mounted() {
    if (!this.isAnswered) {
      const desiredY = this.containerHeight - this.stackHeight - this.$el.scrollHeight;
      this.$tween = new Tween({ x: this.x, y: this.y })
        .to({ x: this.x, y: desiredY }, fallAnimationDuration)
        .on('update', this.setPosition)
        .on('complete', this.$emit.bind(this, 'felt'))
        .start();
    }
  },
  watch: {
    isAnswered(value, oldValue) {
      if (value === oldValue) return;
      if (!this.$tween) return;
      if (!value) return;
      this.$tween.stop();
      this.$tween = new Tween({ x: this.x, y: this.y })
        .to(this.getPositionBasedOnAnswer(), answerAnimationDuration)
        .on('update', this.setPosition)
        .start();
    },
  },
};
</script>
<style lang="stylus">
.stack-block
  position absolute
  display inline-block
  background-color: #2c3e50
  padding 10px
  font-size 1rem
  margin 0
  transform translate(0px, 0px)
  user-select none
  will-change transform
</style>
