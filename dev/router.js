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
          },
          props: {
            menuItems: [
              {
                groupTitle: 'Components',
                children: [
                  {
                    route: '/api-table',
                    title: 'ApiTable',
                    icon: 'el-icon-s-grid',
                  },
                  {
                    route: '/model-form',
                    title: 'ModelForm',
                    icon: 'el-icon-edit-outline',
                  },
                ],
              },
            ],
          },
          children: [
            {
              path: 'api-table',
              name: 'ApiTable',
              component: () => import('../components/ApiTable'),
              meta: {
                title: 'ApiTable'
              },
              props: {
                api: '/api/admin/api-table',
                columns: [
                  {
                    name: '_id',
                    title: 'ID',
                    type: 'hidden',
                  },
                  {
                    name: 'createdAt',
                    title: 'Time',
                    type: 'date',
                  },
                  {
                    name: 'token',
                    title: 'Token',
                  },
                  {
                    name: 'ip',
                    title: 'IP',
                  },
                  {
                    name: 'scene',
                    title: 'Scene',
                    type: 'tag',
                  },
                  {
                    name: 'contact',
                    title: 'Contact',
                    type: 'pre',
                    className: 'normal',
                    getData(row) {
                      return [
                        [
                          _.get(row, 'request[0].firstName'),
                          _.get(row, 'request[0].lastName'),
                        ].filter(Boolean).join(' '),
                        _.get(row, 'request[0].email'),
                        [
                          _.get(row, 'request[0].companyName'),
                          _.get(row, 'request[0].role'),
                        ].filter(Boolean).join(' - '),
                      ].join('\n');
                    },
                  },
                ],
              },
            },
            {
              path: 'model-form',
              name: 'ModelForm',
              component: () => import('../components/ModelForm'),
              meta: { title: 'ModelForm' },
              props: {
                model: {
                  id: 1,
                  title: 'Test article',
                  type: 'article',
                  category: 20,
                },
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                  },
                  {
                    name: 'type',
                    title: 'Type',
                    type: 'select',
                    options: {
                      article: 'Article',
                      file: 'File',
                    },
                  },
                  {
                    name: 'category',
                    title: 'category',
                    type: 'reference',
                    reference: 'categories',
                  },
                ],
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
