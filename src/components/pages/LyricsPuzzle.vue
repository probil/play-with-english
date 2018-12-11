<template>
  <div>
    <SongChooser
      v-if="state === 'chooser'"
      @select="selectSong"
    />
    <LyricsPuzzle
      v-if="state === 'puzzle'"
      @finish="finish"
      :lyrics="song.lyrics"
      :source="song.source"
    />
    <Stats
      v-if="state === 'stats'"
      :stats="lastStats"
      @restart="restart"
    />
  </div>
</template>
<script>
import LyricsPuzzle from '@/components/exercises/lyrics-puzzle/LyricsPuzzle.vue';
import SongChooser from '@/components/exercises/lyrics-puzzle/SongChooser.vue';
import Stats from '@/components/exercises/lyrics-puzzle/Stats.vue';

export default {
  components: {
    LyricsPuzzle,
    SongChooser,
    Stats,
  },
  data: () => ({
    state: 'chooser',
    song: null,
    lastStats: null,
  }),
  methods: {
    selectSong(song) {
      this.song = song;
      this.state = 'puzzle';
    },
    finish(stats) {
      this.state = 'stats';
      this.song = null;
      this.lastStats = stats;
    },
    restart() {
      this.state = 'chooser';
    },
  },
};
</script>
