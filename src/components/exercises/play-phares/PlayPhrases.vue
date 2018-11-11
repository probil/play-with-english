<template>
  <div class="play-phrases">
    <label class="play-phrases__input-label">
      <input
        type="text"
        v-model.trim="searchValue"
        class="play-phrases__input"
      />
    </label>
    <video
      autoplay="autoplay"
      controls="controls"
      class="play-phrases__video"
      v-if="currentVideo"
      ref="video"
      @ended="nextVideo"
      :src="currentVideo"
    ></video>
    <div v-if="!isLoading && !isVideoAvailable" class="play-phrases__nothing">
      Nothing found :(
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('playPhrases', ['searchPhrase']),
    ...mapGetters('playPhrases', ['isVideoAvailable', 'currentVideo', 'isLoading']),
    searchValue: {
      get() {
        return this.searchPhrase;
      },
      set(value) {
        this.setSearchPhrase(value);
        this.searchPhrasesDebounced(value);
      },
    },
  },
  methods: {
    ...mapActions('playPhrases', ['setSearchPhrase', 'moveToNextVideo', 'setRandomPhrase', 'searchPhrasesDebounced', 'searchPhrases']),
    stopVideo() {
      const { video } = this.$refs;
      if (video && !video.paused && !video.ended && video.stop) video.stop();
    },
    nextVideo() {
      this.stopVideo();
      this.moveToNextVideo();
    },
  },
  mounted() {
    this.setRandomPhrase();
    this.searchPhrases();
  },
};
</script>
<style lang="stylus">
.play-phrases
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  height 100vh
  width 100vw
  &__input-label
    width 100%
  &__input
    font-size 4rem
    background-color: rgba(0,0,0, 0.2)
    margin 0
    padding 2rem 0
    border 0
    color white
    outline none
    width 100%
    text-align center
    box-sizing border-box
  &__video
    flex-grow 1
    width 100%
    background-color: black;
  &__nothing
    flex-grow 1
    width 100%
    line-height calc(100vh - 9rem)
    font-size 4rem
    text-align center
</style>
