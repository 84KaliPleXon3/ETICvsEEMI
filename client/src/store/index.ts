import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import questions from './modules/questions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    questions,
  },
  strict: debug,
  plugins: [],
});
