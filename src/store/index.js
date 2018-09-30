import Vue from 'vue';
import Vuex from 'vuex';

import fallStack from './fallStack';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fallStack,
  },
});
