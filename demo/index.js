import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import App from './App.vue';
import VDateRange from '../dist/vuetify-daterange-picker';
import '../dist/vuetify-daterange-picker.css';

Vue.use(Vuetify);
Vue.use(VDateRange);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
