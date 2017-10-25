import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueResource);
Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'indigo',
    accent: 'pink'
  },
  deepPurple: {
    primary: 'deep-purple'
  },
  blueGrey: {
    primary: 'blue-grey'
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});

