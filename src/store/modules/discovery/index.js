/* eslint-disable no-param-reassign,no-shadow */
import axios from 'axios';

const FETCH_WORD_DEFINITION = 'FETCH_WORD_DEFINITION';
const FETCH_WORD_DEFINITION_SUCCESS = 'FETCH_WORD_DEFINITION_SUCCESS';
const FETCH_WORD_DEFINITION_ERROR = 'FETCH_WORD_DEFINITION_ERROR';

const state = {
  definitions: {},
  isLoading: false,
};
const getters = {};

const actions = {
  fetchDefinition: ({ commit }, word) => {
    commit(FETCH_WORD_DEFINITION);
    axios
      .get('https://googledictionaryapi.eu-gb.mybluemix.net', {
        params: {
          define: word,
          lang: 'en',
        },
      })
      .then(definitions => commit(FETCH_WORD_DEFINITION_SUCCESS, definitions))
      .catch(error => commit(FETCH_WORD_DEFINITION_ERROR, error));
  },
};
const mutations = {
  [FETCH_WORD_DEFINITION](state) {
    state.isLoading = true;
  },
  [FETCH_WORD_DEFINITION_SUCCESS](state, definitions) {
    state.isLoading = false;
    definitions.forEach((definition) => {
      state.definitions[definition.word] = definition;
    });
  },
  [FETCH_WORD_DEFINITION_ERROR](state, error) {
    state.isLoading = false;
    state.error = error;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
