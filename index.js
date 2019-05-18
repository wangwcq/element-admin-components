import _ from 'lodash';
import axios from 'axios';
import moment from "moment/moment";
import ClickOutside from "vue-click-outside";

import PageTitle from './components/PageTitle';
import ApiTable from './components/ApiTable';
import ModelForm from './components/ModelForm';
import ModelView from './components/ModelView';

const ElementAdminComponents = {
  install: (Vue, userOptions = {}) => {
    const options = _.merge({
      apiBase: '/api/',
    }, userOptions);

    Vue.directive('click-outside', ClickOutside);

    Vue.component('page-title', PageTitle);
    Vue.component('api-table', ApiTable);
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

    Vue.prototype.$ctx = {
      apiBase: options.apiBase,
    };
    Vue.prototype.$axios = axios;
  },
};

export default ElementAdminComponents;