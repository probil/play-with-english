import Vue from 'vue';
import Vuex from 'vuex';

import fallStack from './modules/fallStack/index';
import playPhrases from './modules/playPhrases/index';
import discovery from './modules/discovery';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fallStack,
    playPhrases,
    discovery,
  },
});
