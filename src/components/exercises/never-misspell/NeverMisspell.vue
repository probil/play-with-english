<template>
  <div class="container mx-auto px-4 py-10 h-screen">
    <h1 class="text-center text-2xl font-bold py-4">Never Misspell</h1>
    <p class="text-center text-lg">Pick the right version of the word</p>
    <div class="flex justify-center my-6">
      <div
          v-for="(option, $index) in currentOptions"
          :key="$index"
          class="w-1/5 m-3 rounded shadow-lg bg-white cursor-pointer select-none"
          :class="{
            'bg-green-400': picked === option && currentWord.correct === picked,
            'bg-red-400': picked === option && currentWord.correct !== picked,
          }"
          @click.prevent="pick(option)"
      >
        <div class="px-6 py-4">
          <h3 class="font-bold text-lg color-red text-gray-700 text-center">{{ option }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _shuffle from 'lodash/shuffle';

const words = [
  { correct: 'pollution', wrong: ['polution', 'pollusion', 'polusion'] },
];

export default {
  data: () => ({
    words,
    questionNumber: 0,
    picked: null,
  }),
  computed: {
    currentWord() {
      return this.words[this.questionNumber];
    },
    currentOptions() {
      const options = [this.currentWord.correct, ...this.currentWord.wrong];
      return _shuffle(options);
    },
  },
  methods: {
    pick(word) {
      if (this.picked) return;
      this.picked = word;
    },
  },
};
</script>
