import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueResource);
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  render: h => h(App)
});

