import _ from 'lodash';
import axios from 'axios';
import moment from "moment/moment";
import ClickOutside from "vue-click-outside";
import VueI18n from 'vue-i18n';

import PageTitle from './components/PageTitle';
import ApiTable from './components/ApiTable';
import ApiPagedTable from "./components/ApiPagedTable";
import ModelForm from './components/ModelForm';
import ModelView from './components/ModelView';

const ElementAdminComponents = {
  install: (Vue, userOptions = {}) => {
    const options = _.merge({
      apiBase: '/api/admin',
      apiUpload: '/api/upload',
      appTitleKey: 'Admin',
      urlBase: '',
      messages: {},
    }, userOptions);

    const ctx = _.omit(options, ['messages']);

    Vue.directive('click-outside', ClickOutside);

    Vue.component('page-title', PageTitle);
    Vue.component('api-table', ApiTable);
    Vue.component('api-paged-table', ApiPagedTable);
    Vue.component('model-form', ModelForm);
    Vue.component('model-view', ModelView);

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

    Vue.use(VueI18n);

    Vue.prototype.$ctx = {
      ...ctx
    };
    Vue._ = _;
    Vue.prototype.$lodash = _;
    Vue.axios = axios;
    Vue.moment = moment;
    Vue.prototype.$axios = axios;
    Vue.prototype.$moment = moment;
  },
  i18n: (userOptions = {}) => {
    const options = _.merge({
      locale: 'zh-CN',
    }, userOptions);
    const i18n = new VueI18n({
      locale: options.locale || 'zh-CN',
      fallbackLocale: 'en',
      messages: {
        'zh-CN': _.merge(require('./langs/zh-CN.json'), _.get(options, ['messages', ['zh-CN']])),
        'en-US': _.merge(require('./langs/en-US.json'), _.get(options, ['messages', ['en-US']])),
      },
    });
    return i18n;
  },
};

export default ElementAdminComponents;
