import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import IQuestion from '@/models/question';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: 0,
    score: 0,
    questions: [] as IQuestion[],
  },
  getters: {
    async fetchQuestions(state): Promise<IQuestion[]> {
      try {
        const res = await axios.get('http://localhost:3000/questions');
        return (state.questions = res.data.questions);
      } catch (e) {
        throw new Error(e);
      }
    },
    index(state) {
      return state.index;
    },
    score(state) {
      return state.score;
    },
    questions(state): IQuestion[] {
      return state.questions;
    },
    getQuestion(state) {
      return state.questions[state.index];
    },
  },
  mutations: {
    increaseIndex(state): number {
      return state.index++;
    },
    increaseScore(state): number {
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
});
