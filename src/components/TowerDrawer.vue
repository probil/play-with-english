<template>
  <div class="tower-drawer">{{ question.title }}</div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
      validate: obj => !!obj && !!obj.title,
    },
  },
};
</script>


<style lang="stylus">
.tower-drawer
  width 100%
  height 800px
  outline 1px solid green
</style>
