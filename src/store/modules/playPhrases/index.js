/* eslint-disable no-param-reassign,no-shadow */
import axios from 'axios';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import {
  SET_RANDOM_PHRASE,
  SET_SEARCH_PHRASE,
  SEARCH_VIDEO,
  SEARCH_VIDEO_ERROR,
  SEARCH_VIDEO_SUCCESS,
  MOVE_TO_NEXT_VIDEO,
} from './mutation-types';

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

const state = {
  error: null,
  loading: false,
  searchPhrase: '',
  currentVideoIndex: 0,
  phrases: null,
};

const getters = {
  isLoading: ({ loading }) => loading,
  currentVideoUrl: ({ phrases, currentVideoIndex }) => _get(phrases, [currentVideoIndex, 'video-url']),
  currentVideoInfo: ({ phrases, currentVideoIndex }) => _get(phrases, [currentVideoIndex, 'video-info']),
  currentVideoSubs: ({ phrases, currentVideoIndex }) => _get(phrases, [currentVideoIndex, 'text']),
  isVideoAvailable: ({ phrases }) => _get(phrases, 'length', 0) > 0,
};

const mutations = {
  [SET_SEARCH_PHRASE](state, phrase) {
    state.searchPhrase = phrase;
  },
  [SET_RANDOM_PHRASE](state) {
    state.searchPhrase = testPhrases[getRandomInt(0, testPhrases.length)];
  },
  [MOVE_TO_NEXT_VIDEO](state) {
    state.currentVideoIndex = (state.currentVideoIndex + 1) % state.phrases.length;
  },
  [SEARCH_VIDEO](state) {
    state.loading = true;
    state.error = null;
  },
  [SEARCH_VIDEO_SUCCESS](state, phrases) {
    state.loading = false;
    state.phrases = phrases;
  },
  [SEARCH_VIDEO_ERROR](state, error) {
    state.loading = false;
    state.error = error;
  },
};

const actions = {
  setSearchPhrase: async ({ commit }, phrase) => {
    commit(SET_SEARCH_PHRASE, phrase);
  },
  setRandomPhrase: async ({ commit }) => {
    commit(SET_RANDOM_PHRASE);
  },
  searchPhrases: async ({ commit, state }) => {
    const q = state.searchPhrase;
    commit(SEARCH_VIDEO);
    try {
      const responses = await axios.get('https://www.playphrase.me/api/v1/phrases/search', {
        params: { q },
      });
      commit(SEARCH_VIDEO_SUCCESS, responses.data.phrases);
    } catch (e) {
      commit(SEARCH_VIDEO_ERROR, e);
    }
  },
  moveToNextVideo({ commit }) {
    commit(MOVE_TO_NEXT_VIDEO);
  },
};

actions.searchPhrasesDebounced = _debounce(actions.searchPhrases, 1500);

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
