import { MutationTree, GetterTree, ActionTree } from 'vuex';
import questions, {
  IStoreQuestions,
} from '../../../src/store/modules/questions';
import axios from 'axios';
import config from '@/config';

const getters = questions.getters as GetterTree<IStoreQuestions, any>;
const mutations = questions.mutations as MutationTree<IStoreQuestions>;
const actions = questions.actions as any;

let state: IStoreQuestions;

describe('Store - Questions', () => {
  beforeEach(() => {
    state = {
      index: 0,
      score: 0,
      questions: [],
    };
  });

  describe('Getters', () => {
    describe('#currentQuestion', () => {
      it('should get current question', () => {
        state.index = 1;
        state.questions = [
          { text: 'test', answer: 1 },
          { text: 'test2', answer: 2 },
        ];

        const question = getters.currentQuestion(state, null, null, null);

        expect(question).toStrictEqual({ text: 'test2', answer: 2 });
      });

      it('should get empty current question', () => {
        state.questions = [];

        const question = getters.currentQuestion(state, null, null, null);

        expect(question).toStrictEqual({});
      });
    });

    describe('#checkAnswer', () => {
      it('should check answer and get true', () => {
        state.questions = [{ text: 'test', answer: 1 }];

        const isCorrect = getters.checkAnswer(
          state,
          null,
          null,
          null,
        )({
          answer: 1,
        });

        expect(isCorrect).toBe(true);
      });

      it('should check answer and get false', () => {
        state.questions = [{ text: 'test', answer: 2 }];

        const isCorrect = getters.checkAnswer(
          state,
          null,
          null,
          null,
        )({
          answer: 1,
        });

        expect(isCorrect).toBe(false);
      });
    });

    describe('#isLastQuestion', () => {
      it('should return true', () => {
        state.questions = [{ text: 'test', answer: 1 }];

        const isLastQuestion = getters.isLastQuestion(state, null, null, null);

        expect(isLastQuestion).toBe(true);
      });

      it('should return false', () => {
        state.questions = [
          { text: 'test', answer: 1 },
          { text: 'test', answer: 1 },
        ];

        const isLastQuestion = getters.isLastQuestion(state, null, null, null);

        expect(isLastQuestion).toBe(false);
      });
    });
  });

  describe('Mutations', () => {
    describe('#setQuestions', () => {
      it('should set questions state', () => {
        mutations.setQuestions(state, [
          { text: 'test', answer: 1 },
          { text: 'test2', answer: 2 },
        ]);

        expect(state.questions.length).toEqual(2);
        expect(typeof state.questions[0].text).toEqual('string');
        expect(typeof state.questions[0].answer).toEqual('number');
      });
    });

    describe('#increaseIndex', () => {
      it('should increase index', () => {
        expect(state.index).toEqual(0);

        mutations.increaseIndex(state);

        expect(state.index).toEqual(1);
      });
    });

    describe('#increaseScore', () => {
      it('should increase score', () => {
        expect(state.score).toEqual(0);

        mutations.increaseScore(state);

        expect(state.score).toEqual(1);
      });
    });

    describe('#resetState', () => {
      it('should reset state', () => {
        state.index = 5;
        state.score = 5;

        mutations.resetState(state);

        expect(state.index).toEqual(0);
        expect(state.score).toEqual(0);
      });
    });
  });

  describe('Actions', () => {
    describe('#increaseIndex', () => {
      it('should commit increaseIndex', async () => {
        const commitMock = jest.fn();

        await actions.increaseIndex({ commit: commitMock });

        expect(commitMock).toBeCalledTimes(1);
        expect(commitMock).toHaveBeenCalledWith('increaseIndex');
      });
    });

    describe('#increaseScore', () => {
      it('should commit increaseScore', async () => {
        const commitMock = jest.fn();

        await actions.increaseScore({ commit: commitMock });

        expect(commitMock).toBeCalledTimes(1);
        expect(commitMock).toHaveBeenCalledWith('increaseScore');
      });
    });

    describe('#fetchQuestions', () => {
      it('should fetch questions from API', async () => {
        const payload = [{ id: '2', name: 'test' }];
        const axiosMock = jest.spyOn(axios, 'get').mockResolvedValue({
          data: { questions: payload },
        } as any);
        const commitMock = jest.fn();

        await actions.fetchQuestions({ commit: commitMock });

        expect(axiosMock).toBeCalledTimes(1);
        expect(axiosMock).toHaveBeenCalledWith(`${config.apiUrl}/questions`);

        expect(commitMock).toBeCalledTimes(1);
        expect(commitMock).toHaveBeenCalledWith('setQuestions', payload);
      });
    });

    describe('#resetState', () => {
      it('should commit resetState', async () => {
        const commitMock = jest.fn();

        await actions.resetState({ commit: commitMock });

        expect(commitMock).toBeCalledTimes(1);
        expect(commitMock).toHaveBeenCalledWith('resetState');
      });
    });
  });
});
