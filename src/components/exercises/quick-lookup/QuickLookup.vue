<template>
  <div class="quick-lookup">
    <input
      type="text"
      v-model="searchValue"
      class="quick-lookup__input"
    />
    <video
      autoplay="autoplay"
      controls="controls"
      class="quick-lookup__video"
      v-if="currentVideo"
      ref="video"
      @ended="nextVideo"
      :src="currentVideo"
    ></video>
    <div v-if="isNoVideoAvailable" class="quick-lookup__nothing">
      Nothing found :(
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import _get from 'lodash.get';

const getRandomInt = (start = 0, end = 10) => Math.round(Math.random() * (end - start)) + start;
const testPhrases = [
  'You\'re welcome!',
  'What\'s up',
  'Are you ready?',
  'I thought',
  'See you soon',
  'give up',
  'appreciate it',
  'Why did you do that',
  'say hello to',
  'back and forth',
  'Let\'s do this',
  'I beg your pardon',
  'stick around',
  'Have you ever been to',
  'I\'m not sure',
  'Good luck',
  'will you please',
  'I knew that',
  'figured out',
  'Be careful',
  'we have to go',
];
export default {
  data: () => ({
    searchValue: '',
    currentVideoIndex: 0,
    response: null,
  }),
  computed: {
    currentVideo() {
      return _get(this.response, ['phrases', this.currentVideoIndex, 'video-url']);
    },
    isNoVideoAvailable() {
      return _get(this.response, 'count') === 0;
    },
  },
  methods: {
    updateTheQuery() {
      this.currentVideoIndex = 0;
      const { video } = this.$refs;
      if (video && !video.paused && !video.ended && video.stop) video.stop();
      this.getVideo(this.searchValue);
    },
    async getVideo(q) {
      const responses = await axios.get('https://www.playphrase.me/api/v1/phrases/search', {
        params: { q },
      });
      this.response = responses.data;
    },
    nextVideo() {
      const { video } = this.$refs;
      if (video && !video.paused && !video.ended) video.stop();
      this.currentVideoIndex = (this.currentVideoIndex + 1) % this.response.phrases.length;
    },
  },
  mounted() {
    const updateTheQueryFn = this.updateTheQuery;
    this.updateTheQuery = debounce(updateTheQueryFn, 1500);
    this.searchValue = testPhrases[getRandomInt(0, testPhrases.length)];
    updateTheQueryFn();
  },
  watch: {
    searchValue() {
      this.updateTheQuery();
    },
  },
};
</script>
<style lang="stylus">
.quick-lookup
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  height 100vh
  width 100vw
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
