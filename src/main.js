import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import App from './App.vue';

import { routes } from './routes';

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  routes
  // mode: 'history' // FIXME: not sure if this will work with gh-pages
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
