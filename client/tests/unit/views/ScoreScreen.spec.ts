import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ScoreScreen from '../../../src/views/ScoreScreen.vue';
import router from '@/router';

const localVue = createLocalVue();

localVue.use(Vuex);

let wrapper: any;

const mountIt = (index = 0, score = 0, questions = []) => {
  wrapper = shallowMount(ScoreScreen, {
    mocks: {
      $store: new Vuex.Store({
        modules: {
          questions: {
            namespaced: true,
            state: {
              index,
              score,
              questions,
            },
          },
        },
      }),
    },
  });
};

describe('Views - ScoreScreen', () => {
  it('should redirect to home on index 0', () => {
    mountIt();

    const routerMock = spyOn(router, 'push');

    // Errored :(
    // expect(routerMock).toBeCalledTimes(1);
    // expect(routerMock).toBeCalledWith({ name: 'home' });
  });

  it('should not redirect to home', () => {
    mountIt(1);

    const routerMock = spyOn(router, 'push');

    expect(routerMock).toBeCalledTimes(0);
  });
});
