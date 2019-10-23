<template>
  <div class="score_screen">
    <h1>Score: {{ score }}/{{ count }}</h1>
    <h3>Bon c'est pas tip top tout ça</h3>
    <button>Rejouer</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ScoreScreen',
  data() {
    return {
      messages: [{ min: 2, msg: 'Bon c\'est pas tip top tout ça' }],
    };
  },
  props: {
    score: Number,
    count: Number,
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
