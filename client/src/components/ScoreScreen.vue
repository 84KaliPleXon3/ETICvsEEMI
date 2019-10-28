<template>
  <div class="score_screen">
    <h1>Score: {{ score }}/{{ count }}</h1>
    <h3>{{ text() }}</h3>
    <button @click="reset">Rejouer</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ScoreScreen',
  data() {
    return {
      messages: [
        { max: 3, msg: 'Bon bah c\'est pas tip top tout ça.' },
        { max: this.count, msg: 'Bravo! Un vrai pro du secteur de la tech school.' },
      ],
    };
  },
  props: {
    score: Number,
    count: Number,
    reset: Function,
  },
  methods: {
    text() {
      const text =  this.messages.find((msg) => this.score <= msg.max);

      return text !== undefined ? text.msg : '';
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
