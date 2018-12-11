<template>
  <div class="play-phrases">
    <label class="play-phrases__input-label">
      <input
        type="text"
        v-model.trim="searchValue"
        class="play-phrases__input"
      />
    </label>
    <div class="play-phrases__video-container">
      <video
        autoplay="autoplay"
        :controls="controls"
        class="play-phrases__video"
        v-if="currentVideoUrl"
        ref="video"
        @click="playPauseVideo"
        @ended="nextVideo"
        @mouseover="showControls"
        @mouseout="hideControls"
        :src="currentVideoUrl"
      ></video>
      <a
        class="play-phrases__video-info"
        title="Click to open IMDB page"
        target="_blank"
        v-if="currentVideoInfo"
        :href="`https://www.imdb.com/title/${currentVideoInfo.imdb}`"
      >
        &#x1F3AC; {{ currentVideoInfo.info }}
      </a>
      <p class="play-phrases__subs">
        {{ currentVideoSubs }}
      </p>
    </div>
    <div v-if="!isLoading && !isVideoAvailable" class="play-phrases__nothing">
      Nothing found :(
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data: () => ({
    controls: 'controls',
  }),
  computed: {
    ...mapState('playPhrases', ['searchPhrase']),
    ...mapGetters('playPhrases', ['isVideoAvailable', 'currentVideoUrl', 'isLoading', 'currentVideoInfo', 'currentVideoSubs']),
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
      if (!video.paused && !video.ended && video.stop) video.stop();
    },
    nextVideo() {
      this.stopVideo();
      this.moveToNextVideo();
    },
    playPauseVideo() {
      const { video } = this.$refs;
      const isPlaying = !video.paused && !video.ended;
      const isPaused = video.paused;
      if (isPaused) return video.play();
      if (isPlaying) return video.pause();
      return undefined;
    },
    showControls() {
      this.controls = 'controls';
    },
    hideControls() {
      this.controls = undefined;
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
  &__video-container
    flex-grow 1
    width 100%
    background-color: black;
    position relative
    display flex
    overflow hidden
  &__video
    min-height 100%
    min-width 100%
  &__video-info
    position absolute
    opacity 0.4
    top 2rem
    right 2rem
    font-size 1.2rem
    text-decoration none
    color: whitesmoke
    background-color: rgba(0, 0, 0, 0.7);
    padding 0.5rem
    border-radius 0.2rem
    &:hover
      opacity 0.85
  &__subs
    position absolute
    bottom 3rem
    left 50%
    transform translateX(-50%)
    font-size 1.5rem
    color: whitesmoke
    background-color: rgba(0, 0, 0, 0.7);
    padding 0.2rem 0.5rem
    border-radius 0.2rem
    box-sizing border-box
    opacity 0.83
    margin 0
    line-height 1.5
  &__nothing
    flex-grow 1
    width 100%
    line-height calc(100vh - 9rem)
    font-size 4rem
    text-align center
</style>
