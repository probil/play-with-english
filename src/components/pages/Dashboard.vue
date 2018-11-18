<template>
  <div class="dashboard">
    <h2>General</h2>
    <p>
      <router-link to="/play-phrases">> Play Phrases</router-link>
    </p>
    <p>
      <router-link to="/lyrics-puzzle">> Lyrics Puzzle</router-link>
    </p>
    <h2>Fall-stack</h2>
    <router-link to="/fall-stack">> Present Simple vs Present Continuous</router-link>
  </div>
</template>
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
