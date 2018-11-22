<template>
  <div class="lyrics-puzzle">
    <h2>Lyrics puzzle</h2>
    <p>You need to put lines from the first column into the second in correct order</p>
    <p>
      <iframe width="100%" height="133" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/179161766&color=%23060505&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
    </p>
    <div class="lyrics-puzzle__columns">
      <draggable
        class="lyrics-puzzle__column-values"
        v-model="shuffledLines"
        :options="{
          group:  'songLines',
          draggable: '.lyrics-puzzle__line'
        }"
      >
        <transition-group name="flip-list" tag="div" class="lyrics-puzzle__group">
          <div
            class="lyrics-puzzle__line"
            v-for="line in shuffledLines"
            :key="`shuffled-${line.id}`"
          >
            {{ line.value }}
          </div>
        </transition-group>
      </draggable>
      <div class="lyrics-puzzle__timer">{{ time | timeFormat }}</div>
      <draggable
        class="lyrics-puzzle__column-check"
        v-model="userLines"
        :options="{
          group: 'songLines',
          draggable: '.lyrics-puzzle__line'
        }"
      >
        <transition-group name="flip-list" tag="div" class="lyrics-puzzle__group">
          <div
            v-for="(line, index) in userLines"
            :key="`user-${line.id}`"
            class="lyrics-puzzle__line"
            :class="{ 'lyrics-puzzle__line--correct': line.id === index }"
          >
            {{ line.value }}
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import _shuffle from 'lodash/shuffle';
import draggable from 'vuedraggable';

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
  components: {
    draggable,
  },
  data: () => ({
    song,
    preparedSong: [],
    shuffledLines: [],
    userLines: [],
    time: 0,
  }),
  methods: {
    prepareSong() {
      this.preparedSong = this.song
        .split('\n')
        .filter(value => value.trim())
        .map((value, id) => ({ value, id }));
      this.shuffledLines = _shuffle(this.preparedSong);
    },
    startTimer() {
      this.$timer = setInterval(() => {
        this.time += 1;
      }, 1000);
    },
  },
  mounted() {
    this.prepareSong();
    this.startTimer();
  },
  filters: {
    timeFormat(value) {
      const minutes = Math.trunc(value / 60);
      const seconds = value % 60;
      const pad = number => (`0${number}`).slice(-2);
      return `${pad(minutes)}:${pad(seconds)}`;
    },
  },
};
</script>
<style lang="stylus">
.lyrics-puzzle
  overflow hidden
  width 80%
  margin 0 auto

  &__columns
    display flex
    justify-content space-between
    height 70vh

  &__column-values, &__column-check
    flex-basis 45%
    overflow-y auto
    border 1px solid red

  &__line
    font-size 1rem
    cursor: move /* fallback */
    cursor: grab
    cursor: -moz-grab;
    cursor: -webkit-grab;
    user-select none
    border 2px solid transparent
    box-sizing border-box
    width 100%
    transition max-height, opacity, transform 0.5s
    overflow hidden

    &--correct
      background-color: green;

    &:active
      /* (Optional) Apply a "closed-hand" cursor during drag operation. */
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
      border 2px dashed grey

    &.sortable-ghost
      opacity 0.4;
      border 2px dashed grey

  &__timer
    align-self center
    font-size 2rem

  &__group
    min-height 100%
    width 100%
    line-height 1.6

.flip-list-move
  transition transform 0.8s

.flip-list-enter, .flip-list-leave-active {
  opacity: 0;
  max-height 0;
}
</style>
