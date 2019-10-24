import axios from 'axios';
import IQuestion from '@/models/question';
import { shuffleArray } from '@/utils';
import { Module } from 'vuex';

const questions: Module<
  { index: number; score: number; questions: IQuestion[] },
  any
> = {
  namespaced: false,
  state: {
    index: 0,
    score: 0,
    questions: [],
  },
  getters: {
    index(state) {
      return state.index;
    },
    score(state) {
      return state.score;
    },
    questions(state): IQuestion[] {
      return state.questions;
    },
    currentQuestion(state): IQuestion | null {
      return state.questions.length ? state.questions[state.index] : null;
    },
    checkAnswer(state) {
      return ({ answer }: { answer: number }): boolean =>
        state.questions[state.index].answer === answer;
    },
  },
  mutations: {
    async fetchQuestions(state): Promise<IQuestion[]> {
      try {
        const res = await axios.get('http://localhost:3000/questions');
        return (state.questions = shuffleArray(res.data.questions));
      } catch (e) {
        throw new Error(e);
      }
    },
    increaseIndex(state: { index: number }): number {
      return state.index++;
    },
    increaseScore(state: { score: number }): number {
      return state.score++;
    },
  },
  actions: {
    increaseIndex(context): void {
      context.commit('increaseIndex');
    },
    increaseScore(context): void {
      context.commit('increaseScore');
    },
  },
};

export default questions;
