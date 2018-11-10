import Vue from 'vue';
import Vuex from 'vuex';

import fallStack from './modules/fallStack/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fallStack,
  },
});
