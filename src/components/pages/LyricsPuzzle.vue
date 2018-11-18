<template>
  <div class="lyrics-puzzle">
    <h2>Lyrics puzzle</h2>
    <p>You need to put lines from the first column into the second in correct order</p>
    <div class="lyrics-puzzle__columns">
      <div class="lyrics-puzzle__column-values">
        ds
      </div>
      <div class="lyrics-puzzle__column-check">
        df
      </div>
    </div>
  </div>
</template>
<script>
const song = `
I want to break free
I want to break free
I want to break free from your lies
You're so self-satisfied I don't need you
I've got to break free
God knows, God knows I want to break free

I've fallen in love
I've fallen in love for the first time
And this time I know it's for real
I've fallen in love, yeah
God knows, God knows I've fallen in love

It's strange but it's true
I can't get over the way you love me like you do
But I have to be sure
When I walk out that door
Oh how I want to be free, baby
Oh how I want to be free
Oh how I want to break free

But life still goes on
I can't get used to, living without, living without
Living without you by my side
I don't want to live alone, hey
God knows, got to make it on my own
So baby can't you see
I've got to break free

I've got to break free
I want to break free, yeah
I want, I want, I want, I want to break free
`;

export default {
  data: () => ({
    song,
  }),
  computed: {
    preparedSong() {
      return this.song.split('\n').filter(value => value.trim());
    },
  },
};
</script>
<style lang="stylus">
.lyrics-puzzle
  width 80%
  margin 0 auto

  &__columns
    display flex
    justify-content space-between

  &__column-values, &__column-check
    flex-basis 40%
    outline 1px solid red
    height 600px
</style>
