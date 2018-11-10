import Vue from 'vue';
import Router from 'vue-router';

import DashboardPage from '@/components/pages/Dashboard.vue';
import FallStackPage from '@/components/pages/FallStack.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: DashboardPage },
    { path: '/fall-stack', component: FallStackPage },
  ],
});
