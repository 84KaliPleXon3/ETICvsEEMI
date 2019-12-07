<template>
  <div class="home">
    <Quiz />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import Quiz from '../components/Quiz.vue';

export default Vue.extend({
  name: 'home',
  components: { Quiz },
  async created() {
    await this.$store.dispatch('questions/fetchQuestions');
    await this.$store.dispatch('schools/fetchSchools');
  },
});
</script>
