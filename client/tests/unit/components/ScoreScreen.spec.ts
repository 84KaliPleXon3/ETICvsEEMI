import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ScoreScreen from '../../../src/components/ScoreScreen.vue';
import router from '@/router';

const localVue = createLocalVue();

localVue.use(Vuex);

let $store: any;

let wrapper: any;

describe('Component - ScoreScreen', () => {
  beforeEach(() => {
    $store = new Vuex.Store({
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
    wrapper = shallowMount(ScoreScreen, {
      mocks: { $store },
      propsData: {
        score: 2,
        count: 5,
      },
    });
  });

  it('should display message based on score', () => {
    expect(wrapper.find('h3').text()).toBe(
      'Bon bah c\'est pas tip top tout ça.',
    );
  });

  it('should call reset state function', () => {
    const dispatchMock = spyOn($store, 'dispatch');
    const routerMock = spyOn(router, 'push');

    wrapper.find('button.replay-btn').trigger('click');

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith('questions/resetState');

    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith({ name: 'home' });
  });
});
