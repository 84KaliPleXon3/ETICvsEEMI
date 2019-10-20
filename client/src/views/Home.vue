<template>
  <div class="home">
    <h1>HETIC vs EEMI</h1>

    <h2>{{ getQuestion }}</h2>
    <p>Plutôt HETIC ou EEMI ? ({{ index + 1 }}/{{ getQuestionCount }})</p>

    <span v-for="(choice) in choices" :key="choice.id">
      <button @click="answer(choice.id)">{{ choice.name }}</button>
    </span>
    <hr />
    Score: {{ score }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IQuestion from '../models/question';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'home',
  data() {
    return {
      choices: [{ id: 1, name: 'HETIC' }, { id: 2, name: 'EEMI' }],
    };
  },
  computed: {
    ...mapGetters(['fetchQuestions', 'questions', 'index', 'score']),
    ...mapMutations(['increaseIndex', 'increaseScore']),
    getQuestion(): IQuestion {
      const index: number = this.$store.getters.index;
      const questions: IQuestion[] = this.$store.getters.questions;

      return questions.length > 0
        ? this.$store.getters.questions[index].text
        : null;
    },
    getQuestionCount(): number {
      const questions: IQuestion[] = this.$store.getters.questions;

      return questions.length > 0 ? questions.length : 0;
    },
  },
  methods: {
    answer(answer: number): void {
      const index: number = this.$store.getters.index;
      const questions: IQuestion[] = this.$store.getters.questions;

      if (questions[index].answer === answer) {
        this.$store.dispatch('increaseScore');
      }

      if (questions[index + 1]) {
        this.$store.dispatch('increaseIndex');
      } else {
        // TODO: add score screen
        console.log('Finish! Score:', this.$store.getters.score);
      }
    },
  },
  components: {},
  async created() {
    await this.$store.getters.fetchQuestions;
  },
});
</script>
