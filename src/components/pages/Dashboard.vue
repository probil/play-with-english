<template>
  <div class="dashboard">
    <h2>Exercises</h2>
    <p v-for="exercise in exercises" :key="exercise.link">
      <router-link :to="exercise.link">> {{ exercise.title }}</router-link>
    </p>
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
    ],
  }),
};
</script>
<style lang="stylus">
  .dashboard
    width 400px
    margin 40px auto
    box-sizing border-box
    a
      color whitesmoke
      text-decoration none
      &:hover
        border-bottom 1px dotted whitesmoke
</style>
