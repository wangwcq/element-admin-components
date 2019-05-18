/* global _: true */
import Vue from 'vue';
import Meta from 'vue-meta';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import moment from 'moment';
import lodash from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementAdminComponents from '../index';
import '../utils/axios-mock-adapter';

window._ = lodash;

Vue.config.productionTip = false;

Vue.use(Meta);
Vue.use(ElementUI, { locale });

Vue.use(ElementAdminComponents);

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
