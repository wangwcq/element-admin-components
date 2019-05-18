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

Vue.use(ElementAdminComponents, {
  appTitle: 'Element Admin Components',
  appTitleKey: 'app',
});

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  router,
  store,
  i18n: ElementAdminComponents.i18n({
    messages: {
      'zh-CN': require('./langs/zh-CN'),
      'en-US': require('./langs/en-US'),
    },
  }),
  render: h => h(App),
}).$mount('#app');
