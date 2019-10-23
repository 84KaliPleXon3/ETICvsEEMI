<template>
  <div class="home">
    <div v-show="!finished">
      <h1>HETIC vs EEMI</h1>

      <h2>{{ getQuestion.text }}</h2>
      <p>Plus Éemien ou Héticien ? ({{ index + 1 }}/{{ getQuestionCount }})</p>

      <span v-for="(choice) in choices" :key="choice.id">
        <button @click="answer(choice.id)">{{ choice.name }}</button>
      </span>
    </div>

    <ScoreScreen v-show="finished" :score="score" :count="getQuestionCount" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IQuestion from '../models/question';
import { mapState, mapGetters, mapMutations } from 'vuex';
import ScoreScreen from '../components/ScoreScreen.vue';

export default Vue.extend({
  name: 'home',
  data() {
    return {
      choices: [{ id: 1, name: 'HETIC' }, { id: 2, name: 'EEMI' }],
      finished: false,
    };
  },
  computed: {
    ...mapGetters([
      'fetchQuestions',
      'questions',
      'index',
      'score',
      'currentQuestion',
      'checkAnswer',
    ]),
    ...mapMutations(['increaseIndex', 'increaseScore']),
    getQuestion(): IQuestion | {} {
      return this.$store.getters.currentQuestion || {};
    },
    getQuestionCount(): number {
      return this.$store.getters.questions.length;
    },
  },
  methods: {
    answer(answer: number): void {
      const index: number = this.$store.getters.index;
      const questions: IQuestion[] = this.$store.getters.questions;

      if (this.$store.getters.checkAnswer({ answer })) {
        this.$store.dispatch('increaseScore');
      }

      if (questions[index + 1]) {
        this.$store.dispatch('increaseIndex');
      } else {
        this.finished = true;
      }
    },
  },
  components: {
    ScoreScreen,
  },
  async created() {
    await this.$store.getters.fetchQuestions;
  },
});
</script>
