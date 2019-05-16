/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: {},
  },
  mutations: {
    adminLoggedIn(state, admin) {
      state.admin = admin;
    },
  },
  actions: {
    async checkLoggedIn({ commit }, cb) {
      let loggedInRes = null;
      try {
        loggedInRes = await axios.get('/api/admin/whoami');
      } catch (e) {
        cb.fail();
        return;
      }
      loggedInRes = loggedInRes.data;
      if (loggedInRes.code === 0) {
        commit('adminLoggedIn', loggedInRes.data);
        cb.ok();
      } else {
        cb.fail();
      }
    },
    async logout({ commit }, cb) {
      await axios.get('/api/admin/logout');
      commit('adminLoggedIn', null);
      cb.ok();
    },
  },
});
