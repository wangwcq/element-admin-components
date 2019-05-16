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
          children: [
            {
              path: 'api-table',
              name: 'ApiTable',
              component: () => import('../components/ApiTable'),
              props: {

              },
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
