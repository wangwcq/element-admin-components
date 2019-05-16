/* global _: true */
import Vue from 'vue';
import Meta from 'vue-meta';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import moment from 'moment';
import axios from 'axios';
import ClickOutside from 'vue-click-outside';
import lodash from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import PageTitle from '../components/PageTitle.vue';
import ApiTable from '../components/ApiTable.vue';
import ModelForm from '../components/ModelForm.vue';
import ModelView from '../components/ModelView.vue';
import '../utils/axios-mock-adapter';

window._ = lodash;

Vue.config.productionTip = false;

Vue.use(Meta);
Vue.use(ElementUI, { locale });

Vue.component('page-title', PageTitle);
Vue.component('api-table', ApiTable);
Vue.component('model-form', ModelForm);
Vue.component('model-view', ModelView);
Vue.directive('click-outside', ClickOutside);

Vue.mixin({
  methods: {
    webSetting(keys) {
      const ret = {};
      _.forEach(keys, k => {
        ret[k] = _.get(window.webSettings || {}, k);
      });
      return ret;
    },
  },
});

Vue.mixin({
  methods: {
    objGet: _.get,
    formatDate(dateInput, format = 'YYYY-MM-DD HH:mm:ss') {
      if (!dateInput) {
        return '-';
      }
      return moment(dateInput).format(format);
    },
  },
});

Object.defineProperty(Vue.prototype, '$axios', { value: axios });
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
