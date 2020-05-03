<template>
  <div class="lyrics-puzzle">
    <h2>Lyrics puzzle</h2>
    <p>
      <MusicPlayer :source="source"/>
    </p>
    <div class="lyrics-puzzle__columns">
      <draggable
        class="lyrics-puzzle__column-values"
        v-model="shuffledLines"
        :options="{
          group:  'lyricsLines',
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
          group: 'lyricsLines',
          draggable: '.lyrics-puzzle__line',
        }"
      >
        <transition-group name="flip-list" tag="div" class="lyrics-puzzle__group">
          <div
            v-for="(line, index) in userLines"
            :key="`user-${line.id}`"
            class="lyrics-puzzle__line"
            :class="{
              'lyrics-puzzle__line--correct': isLineCorrect(line, index),
              'lyrics-puzzle__line--incorrect': !isLineCorrect(line, index),
            }"
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
import timeFormat from '@/filters/timeFormat';
import MusicPlayer from './MusicPlayer.vue';

export default {
  components: {
    draggable,
    MusicPlayer,
  },
  props: {
    lyrics: String,
    source: String,
  },
  data: () => ({
    preparedSong: [],
    shuffledLines: [],
    userLines: [],
    time: 0,
  }),
  computed: {
    isFinished() {
      return this.shuffledLines.length === 0
        && this.userLines.length === this.preparedSong.length
        && this.userLines.length > 0
        && this.userLines.every(this.isLineCorrect);
    },
  },
  methods: {
    prepareSong() {
      this.preparedSong = this.lyrics
        .split('\n')
        .filter((value) => value.trim())
        .map((value, id) => ({ value, id }));
      this.shuffledLines = _shuffle(this.preparedSong);
    },
    startTimer() {
      this.$timer = setInterval(() => {
        this.time += 1;
      }, 1000);
    },
    isLineCorrect(line, index) {
      return this.preparedSong[index].value.trim() === line.value.trim();
    },
  },
  mounted() {
    this.prepareSong();
    this.startTimer();
  },
  filters: {
    timeFormat,
  },
  watch: {
    isFinished(value) {
      if (value) {
        clearInterval(this.$timer);
        this.$emit('finish', { time: this.time });
      }
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
    height calc(100vh - 244px)

  &__column-values, &__column-check
    flex-basis 45%
    overflow-y auto
    border 1px solid #344a5f

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
      background-color green

    &--incorrect
      background-color: red;

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
