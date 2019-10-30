<template>
  <div id="score_screen">
    <h2>Score: {{ score }}/{{ questions.length }}</h2>
    <h3>{{ text() }}</h3>
    <button class="replay-btn" @click="reset">Recommencer</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'ScoreScreen',
  data() {
    return {
      messages: [
        { min: 0, msg: 'T\'as pas lu les questions avoues.' },
        { min: 1, msg: 'Bon bah c\'est pas tip top tout ça.' },
        { min: 4, msg: 'Pas mal ! Mais encore des efforts à faire.' },
        { min: 6, msg: 'Bravo! Un vrai pro du secteur de la tech school.' },
      ],
    };
  },
  props: {
    reset: Function,
  },
  computed: {
    ...mapGetters('questions', ['questions', 'score']),
  },
  methods: {
    text() {
      const text = this.messages.filter((msg) => this.score >= msg.min);

      return text[0] !== undefined ? text[0].msg : '';
    },
  },
});
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
