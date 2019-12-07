import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Quiz from '../../../src/components/Quiz.vue';
import router from '@/router';

const localVue = createLocalVue();

localVue.use(Vuex);

const checkAnswerMock = jest.fn();

let isLastQuestionMock = false;
let $store: any;
let wrapper: any;

describe('Component - Quiz', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();

    $store = new Vuex.Store({
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
            checkAnswer: () => checkAnswerMock,
            isLastQuestion: () => isLastQuestionMock,
          },
        },
        schools: {
          namespaced: true,
          state: {
            schools: [{ id: 1, name: 'school1' }],
          },
          getters: {},
        },
      },
    });

    wrapper = shallowMount(Quiz, {
      mocks: { $store },
    });
  });

  it('should display question', () => {
    expect(wrapper.find('#question_text').text()).toBe('currentQuestion');
  });

  it('should display question', () => {
    expect(wrapper.find('span.progress').text()).toBe('(1/1)');
  });

  it('should only increase index', () => {
    const dispatchMock = spyOn($store, 'dispatch');
    const routerMock = spyOn(router, 'push');

    checkAnswerMock.mockImplementation(() => false);
    isLastQuestionMock = false;

    wrapper
      .findAll('.choice-btn')
      .at(0)
      .trigger('click');

    expect(checkAnswerMock).toBeCalledTimes(1);
    expect(checkAnswerMock).toBeCalledWith({ answer: 1 });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith('questions/increaseIndex');

    expect(routerMock).toBeCalledTimes(0);
  });

  it('should increase score and index', () => {
    const dispatchMock = spyOn($store, 'dispatch');
    const routerMock = spyOn(router, 'push');

    checkAnswerMock.mockImplementation(() => true);
    isLastQuestionMock = false;

    wrapper
      .findAll('.choice-btn')
      .at(0)
      .trigger('click');

    expect(checkAnswerMock).toBeCalledTimes(1);
    expect(checkAnswerMock).toBeCalledWith({ answer: 1 });

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).nthCalledWith(1, 'questions/increaseScore');
    expect(dispatchMock).nthCalledWith(2, 'questions/increaseIndex');

    expect(routerMock).toBeCalledTimes(0);
  });

  it('should to score screen', () => {
    const dispatchMock = spyOn($store, 'dispatch');
    const routerMock = spyOn(router, 'push');

    checkAnswerMock.mockImplementation(() => false);
    isLastQuestionMock = true;

    wrapper
      .findAll('.choice-btn')
      .at(0)
      .trigger('click');

    expect(checkAnswerMock).toBeCalledTimes(1);
    expect(checkAnswerMock).toBeCalledWith({ answer: 1 });

    expect(dispatchMock).toBeCalledTimes(0);

    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith({ name: 'scoreScreen' });
  });
});
