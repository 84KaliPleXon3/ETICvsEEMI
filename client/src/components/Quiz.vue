<template>
  <div id="quizz_input">
    <h2 id="question_text">{{ currentQuestion.text }}</h2>
    <p>
      Plus Éemien ou Héticien ?
      <span class="progress">({{ index + 1 }}/{{ questions.length }})</span>
    </p>

    <span v-for="(choice) in schools" :key="choice.id">
      <button class="choice-btn" @click="answer(choice.id)">{{ choice.name }}</button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import router from '../router';
import IQuestion from '../models/question';

export default Vue.extend({
  name: 'Quiz',
  props: {},
  computed: {
    ...mapGetters('schools', ['schools']),
    ...mapGetters('questions', [
      'questions',
      'index',
      'score',
      'currentQuestion',
      'checkAnswer',
      'isLastQuestion',
    ]),
  },
  methods: {
    answer(answer: number): void {
      const index: number = this.index;
      const questions: IQuestion[] = this.questions;

      if (this.checkAnswer({ answer })) {
        this.$store.dispatch('questions/increaseScore');
      }

      if (!this.isLastQuestion) {
        this.$store.dispatch('questions/increaseIndex');
      } else {
        router.push({ name: 'scoreScreen' });
      }
    },
  },
});
</script>