<template>
  <div class="conditions-control-panel">
    <button
      v-for="condition in conditions"
      :key="condition.id"
      class="conditions-control-panel__btn"
      @click="$emit('answer', condition.id)"
    >
      {{ condition.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    conditions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
.conditions-control-panel
  height 100px
  width 100%
  outline: 1px solid red
  display flex

  &__btn
    display block
    flex-basis 50%
    outline 1px solid yellow
    background-color: #2c3e50
    border none
    cursor pointer
    border-radius 5px
    color: inherit
    font-size 1.5rem
</style>
