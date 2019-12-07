import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ScoreScreen from '../../../src/components/ScoreScreen.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
  modules: {
    questions: {
      namespaced: true,
      state: {
        index: 0,
        score: 0,
        questions: [],
      },
    },
  },
});

const resetMock = jest.fn();

const wrapper = shallowMount(ScoreScreen, {
  mocks: { $store },
  propsData: {
    score: 2,
    count: 5,
    reset: resetMock,
  },
});

describe('Component - ScoreScreen', () => {
  it('should display message based on score', () => {
    expect(wrapper.find('h3').text()).toBe(
      'Bon bah c\'est pas tip top tout ça.',
    );
  });

  it('should call reset state function', () => {
    wrapper.find('button.replay-btn').trigger('click');

    expect(resetMock).toBeCalledTimes(1);
  });
});
