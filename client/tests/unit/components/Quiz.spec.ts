import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Quiz from '../../../src/components/Quiz.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
  modules: {
    questions: {
      namespaced: true,
      state: {
        index: 0,
        score: 0,
        questions: [{ answer: 1, text: 'test' }],
      },
      getters: {
        currentQuestion: () => ({
          text: 'currentQuestion',
        }),
      },
    },
    schools: {
      namespaced: true,
      state: {
        schools: [],
      },
      getters: {},
    },
  },
});

const resetMock = jest.fn();

const wrapper = shallowMount(Quiz, {
  mocks: { $store },
});

describe('Component - ScoreScreen', () => {
  it('should display question', () => {
    expect(wrapper.find('#question_text').text()).toBe('currentQuestion');
  });

  it('should display question', () => {
    expect(wrapper.find('span.progress').text()).toBe('(1/1)');
  });

  it.skip('should call reset state function', () => {
    wrapper.find('span button').trigger('click');

    expect(resetMock).toBeCalledTimes(1);
  });
});
