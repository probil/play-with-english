<template>
  <div class="dashboard">
    <div class="dashboard__exercises">
      <h2 class="text-xl font-bold">Exercises</h2>
      <router-link
        v-for="exercise in exercises"
        :key="exercise.link"
        class="exercise-line"
        tag="div"
        :to="exercise.link"
      >
        <div class="exercise-line__arrow">&#x27A4;</div>
        <div class="exercise-line__details">
          <h3 class="text-lg font-bold">{{ exercise.title }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    exercises: [
      {
        title: 'Play Phrases',
        link: '/play-phrases',
      },
      {
        title: 'Lyrics Puzzle',
        link: '/lyrics-puzzle',
      },
      {
        title: 'Fall-stack',
        link: '/fall-stack',
      },
      {
        title: 'Never Misspell',
        link: '/never-misspell',
      },
    ],
  }),
};
</script>
<style lang="stylus">
  .dashboard
    height 100vh
    overflow hidden

    &__exercises
      width: 960px;
      height 100%
      margin: auto;
      box-sizing border-box
      display flex
      justify-content center
      align-items center
      flex-direction column

  .exercise-line
    width 100%
    height: 7rem
    display flex
    cursor pointer
    user-select none

    &:hover
      background-color: rgb(78, 110, 142)

    &:active
      background-color: rgb(40, 57, 74)

    &__arrow
      content '&#10148;'
      font-size 2.5rem
      height 7rem
      width 7rem
      display flex
      justify-content center
      align-items center
      flex-grow 0

    &__details
      flex-grow 1
      display flex
      flex-direction column
      justify-content center

    &__title
      margin 0
      font-size 1.2rem
      display flex
      align-items center
      height 100%
      width 100%
      color whitesmoke
      text-decoration none
      padding 0

</style>
