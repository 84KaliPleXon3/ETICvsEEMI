import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '../../../src/views/Home.vue';
import axios from 'axios';
import config from '@/config';
import questions from '@/store/modules/questions';
import schools from '@/store/modules/schools';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
  modules: {
    questions,
    schools,
  },
});
const axiosMock = jest
  .spyOn(axios, 'get')
  .mockResolvedValueOnce({ data: { questions: [] } } as any)
  .mockResolvedValueOnce({ data: { schools: [] } } as any);

shallowMount(Home, { mocks: { $store } });

describe('Views - Home', () => {
  it('should fetch questions and shools', () => {
    expect(axiosMock).toBeCalledTimes(2);
    expect(axiosMock).toHaveBeenNthCalledWith(1, `${config.apiUrl}/questions`);
    expect(axiosMock).toHaveBeenNthCalledWith(2, `${config.apiUrl}/schools`);
  });
});
