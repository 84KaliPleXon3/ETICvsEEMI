import axios from 'axios';
import IQuestion from '@/models/question';
import { shuffleArray } from '@/utils';
import { Module } from 'vuex';
import config from '@/config';

export interface IStoreQuestions {
  index: number;
  score: number;
  questions: IQuestion[];
}

const questions: Module<
IStoreQuestions,
  any
> = {
  namespaced: false,
  state: {
    index: 0,
    score: 0,
    questions: [],
  },
  getters: {
    index(state): number {
      return state.index;
    },
    score(state): number {
      return state.score;
    },
    questions(state): IQuestion[] {
      return state.questions;
    },
    currentQuestion(state): IQuestion | {} {
      return state.questions.length ? state.questions[state.index] : {};
    },
    checkAnswer(state) {
      return ({ answer }: { answer: number }): boolean =>
        state.questions[state.index].answer === answer;
    },
    isLastQuestion(state) {
      return state.questions.length - 1 === state.index;
    },
  },
  mutations: {
    setQuestions(state, payload): IQuestion[] {
      return (state.questions = payload);
    },
    increaseIndex(state): number {
      return state.index++;
    },
    increaseScore(state): number {
      return state.score++;
    },
    resetState(state) {
      state.index = 0;
      state.score = 0;

      return state;
    },
  },
  actions: {
    increaseIndex(context): void {
      context.commit('increaseIndex');
    },
    increaseScore(context): void {
      context.commit('increaseScore');
    },
    async fetchQuestions(context): Promise<void> {
      const res = await axios.get(`${config.apiUrl}/questions`);
      const payload = shuffleArray(res.data.questions);

      context.commit('setQuestions', payload);
    },
    resetState(context): void {
      context.commit('resetState');
    },
  },
};

export default questions;
