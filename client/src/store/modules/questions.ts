import axios from 'axios';
import IQuestion from '@/models/question';
import { shuffleArray } from '@/utils';
import { Module } from 'vuex';
import ISchool from '@/models/school';

const questions: Module<
  { index: number; score: number; questions: IQuestion[]; schools: ISchool[] },
  any
> = {
  namespaced: false,
  state: {
    index: 0,
    score: 0,
    questions: [],
    schools: [],
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
    schools(state): ISchool[] {
      return state.schools;
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
    setSchools(state, payload): ISchool[] {
      return (state.schools = payload);
    },
    increaseIndex(state: { index: number }): number {
      return state.index++;
    },
    increaseScore(state: { score: number }): number {
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
      const res = await axios.get('http://localhost:3000/questions');
      const payload = shuffleArray(res.data.questions);

      context.commit('setQuestions', payload);
    },
    async fetchSchools(context): Promise<void> {
      const res = await axios.get('http://localhost:3000/schools');
      const schools = shuffleArray(res.data.schools);

      context.commit('setSchools', schools);
    },
    resetState(context): void {
      context.commit('resetState');
    },
  },
};

export default questions;