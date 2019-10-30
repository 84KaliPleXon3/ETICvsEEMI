import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '../../../src/views/Home.vue';
import axios from 'axios';
import config from '@/config';
import questions from '@/store/modules/questions';
import schools from '@/store/modules/questions';

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
  .mockResolvedValue({ data: { questions: [] } } as any);
const wrapper = shallowMount(Home, { mocks: { $store } });

describe.skip('Views - Home', () => {
  it('should ', () => {
    const storeDispatchMock = spyOn($store, 'dispatch');

    // wrapper.find('.todoList__removeDone').trigger('click');
    // expect(storeDispatchMock).toBeCalledTimes(2);
    // expect(storeDispatchMock).toHaveBeenNthCalledWith(1, 'fetchQuestions');
    // expect(storeDispatchMock).toHaveBeenNthCalledWith(2, 'fetchSchools');
    expect(axiosMock).toBeCalledTimes(2);
    expect(axiosMock).toHaveBeenNthCalledWith(1, `${config.apiUrl}/questions`);
    expect(axiosMock).toHaveBeenNthCalledWith(2, `${config.apiUrl}/schools`);
  });
});
