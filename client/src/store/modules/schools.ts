import axios from 'axios';
import { shuffleArray } from '@/utils';
import { Module } from 'vuex';
import ISchool from '@/models/school';
import config from '@/config';

export interface IStoreSchools {
  schools: ISchool[];
}

const schools: Module<IStoreSchools, any> = {
  namespaced: false,
  state: {
    schools: [],
  },
  getters: {
    schools(state): ISchool[] {
      return state.schools;
    },
  },
  mutations: {
    setSchools(state, payload): ISchool[] {
      return (state.schools = payload);
    },
  },
  actions: {
    async fetchSchools(context): Promise<void> {
      const res = await axios.get(`${config.apiUrl}/schools`);
      const payload = res.data.schools;

      context.commit('setSchools', payload);
    },
  },
};

export default schools;
