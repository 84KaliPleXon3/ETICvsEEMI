<template>
  <div class="home">
    <div v-show="!finished">
      <h1>HETIC vs EEMI</h1>

      <h2>{{ currentQuestion.text }}</h2>
      <p>Plus Éemien ou Héticien ? ({{ index + 1 }}/{{ questions.length }})</p>

      <span v-for="(choice) in schools" :key="choice.id">
        <button @click="answer(choice.id)">{{ choice.name }}</button>
      </span>
    </div>

    <ScoreScreen v-show="finished" :score="score" :count="questions.length" :reset="resetGame" />
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
      finished: false,
    };
  },
  computed: {
    ...mapState(['index', 'score', 'questions']),
    ...mapGetters([
      'questions',
      'schools',
      'index',
      'score',
      'currentQuestion',
      'checkAnswer',
      'isLastQuestion',
    ]),
    ...mapMutations(['fetchQuestions', 'increaseIndex', 'increaseScore']),
  },
  methods: {
    answer(answer: number): void {
      const index: number = this.index;
      const questions: IQuestion[] = this.questions;

      if (this.checkAnswer({ answer })) {
        this.$store.dispatch('increaseScore');
      }

      if (!this.isLastQuestion) {
        this.$store.dispatch('increaseIndex');
      } else {
        this.finished = true;
      }
    },
    resetGame(): void {
      this.finished = false;
      this.$store.dispatch('resetState');
    },
  },
  components: {
    ScoreScreen,
  },
  async created() {
    await this.$store.dispatch('fetchQuestions');
    await this.$store.dispatch('fetchSchools');
  },
});
</script>
