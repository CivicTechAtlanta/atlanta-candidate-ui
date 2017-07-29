import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // baseURL: 'https://atlanta-candidate-api.herokuapp.com',
    baseURL: 'http://localhost:3000',
    districtID: null,
    offices: undefined
  },
  mutations: {
    setDistrict (state, id) {
      state.districtID = id;
    },
    setOfficesForDistrict (state, offices) {
      if (offices) {
        state.offices = offices;
      }
    }
  },
  actions: {
    getOfficesForDistrict ({ commit, state }) {
      let url = parseInt(state.districtID) ? `${state.baseURL}/api/v1/offices/?district_id=${state.districtID}&citywide=true` : `${state.baseURL}/api/v1/offices`;
      return axios.get(url).then(resp => {
        commit('setOfficesForDistrict', resp.data.offices);
        return resp.data.offices;
      }).catch(error => {
        console.log(error); // TODO
      });
    }
  }
});
