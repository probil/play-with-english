<template>
  <div class="tower-drawer" ref="container">
    <p class="tower-drawer__question" ref="question">
      {{ question.title }}
    </p>
    <div class="tower-drawer__controls">
      <button @click="clickRight">right</button>
      <button @click="clickLeft">left</button>
      <button @click="clickRightOutside">right outside</button>
      <button @click="clickLeftOutside">left outside</button>
    </div>
  </div>
</template>

<script>
import { Tween, autoPlay } from 'es6-tween';

const getElTransform = (el) => {
  const currentStyle = window.getComputedStyle(el);
  const [,,,, transformX, transformY] = currentStyle
    .getPropertyValue('transform')
    .replace(/[^0-9\-.,]/g, '')
    .split(',');
  return { transformX: +transformX, transformY: +transformY };
};

const getTotalHeight = el => el.scrollHeight;
const getTotalWidth = el => el.scrollWidth;

const fallTween = question => new Tween({ y: 0 })
  .to({ y: 800 - getTotalHeight(question) }, 10000)
  .on('update', ({ y }) => {
    // eslint-disable-next-line no-param-reassign
    question.style.transform = `translateY(${y}px)`;
  });

const rightStackTween = (question) => {
  const { transformY, transformX } = getElTransform(question);
  const positionX = Math.round(getTotalWidth(question) / 2);
  return new Tween({ y: transformY, x: transformX })
    .to({ y: 800 - getTotalHeight(question), x: positionX }, 1000)
    .on('update', ({ y, x }) => {
      // eslint-disable-next-line no-param-reassign
      question.style.transform = `translate(${x}px, ${y}px)`;
    });
};

const leftStackTween = (question) => {
  const { transformY, transformX } = getElTransform(question);
  const positionX = Math.round(getTotalWidth(question) / 2);
  return new Tween({ y: transformY, x: transformX })
    .to({ y: 800 - getTotalHeight(question), x: -positionX }, 1000)
    .on('update', ({ y, x }) => {
      // eslint-disable-next-line no-param-reassign
      question.style.transform = `translate(${x}px, ${y}px)`;
    });
};

const rightOutsideTween = (question, container) => {
  const { transformY, transformX } = getElTransform(question);
  const positionX = Math.round(getTotalWidth(container) / 2) + getTotalWidth(question);
  return new Tween({ y: transformY, x: transformX })
    .to({ y: transformY + 200, x: positionX }, 1000)
    .on('update', ({ y, x }) => {
      // eslint-disable-next-line no-param-reassign
      question.style.transform = `translate(${x}px, ${y}px)`;
    });
};

const leftOutsideTween = (question, container) => {
  const { transformY, transformX } = getElTransform(question);
  const positionX = Math.round(getTotalWidth(container) / 2) + getTotalWidth(question);
  return new Tween({ y: transformY, x: transformX })
    .to({ y: transformY + 200, x: -positionX }, 1000)
    .on('update', ({ y, x }) => {
      // eslint-disable-next-line no-param-reassign
      question.style.transform = `translate(${x}px, ${y}px)`;
    });
};

let currentTween;

export default {
  props: {
    question: {
      type: Object,
      required: true,
      validate: obj => !!obj && !!obj.title,
    },
  },
  mounted() {
    autoPlay(true);
    const { question } = this.$refs;
    currentTween = fallTween(question).start();
  },
  methods: {
    clickRight() {
      currentTween.stop();
      const { question } = this.$refs;
      rightStackTween(question).start();
    },
    clickLeft() {
      currentTween.stop();
      const { question } = this.$refs;
      leftStackTween(question).start();
    },
    clickRightOutside() {
      currentTween.stop();
      const { question, container } = this.$refs;
      rightOutsideTween(question, container).start();
    },
    clickLeftOutside() {
      currentTween.stop();
      const { question, container } = this.$refs;
      leftOutsideTween(question, container).start();
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
  overflow hidden
  outline 1px solid #2c3e50

  &__question
    display inline-block
    background-color: #2c3e50
    padding 10px
    font-size 1rem
    margin 0
    transform translateY(0px)
    user-select none
    will-change transform

  &__controls
    position absolute
    bottom 0
</style>
