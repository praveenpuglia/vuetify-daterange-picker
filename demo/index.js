import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import App from './App.vue';

Vue.use(Vuetify);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
