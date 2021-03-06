import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import Admin from './Admin.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin,
      props: {
        requireAuth: false,
      },
      meta: { title: 'Home' },
      children: [
        {
          path: '',
          name: 'Admin',
          component: () => import('./SubAppAdmin'),
          meta: {
            appTitle: 'Components',
            appTitleKey: 'app',
          },
          children: [
            {
              path: 'api-table',
              name: 'ApiTable',
              component: () => import('./views/ApiTableView'),
              meta: {
                title: 'ApiTable',
                titleKey: 'ApiTable',
              },
            },
            {
              path: 'model-form',
              name: 'ModelForm',
              component: () => import('./views/ModelFormView'),
              meta: { title: 'ModelForm', titleKey: 'ModelForm' },
            },
            {
              path: 'model-view',
              name: 'ModelView',
              component: () => import('./views/ModelViewView'),
              meta: { title: 'ModelView', titleKey: 'ModelView' },
            },
            {
              path: '',
              redirect: 'api-table',
            },
          ],
        },
      ],
    },
  ],
});
