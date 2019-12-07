<template>
  <div id="score_screen">
    <h2>Score: {{ score }}/{{ count }}</h2>
    <h3>{{ text() }}</h3>
    <button class="replay-btn" @click="reset">Recommencer</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface IMessage {
  min: number;
  msg: string;
}

export default Vue.extend({
  name: 'ScoreScreen',
  data(): { messages: IMessage[] } {
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
    score: Number,
    count: Number,
    reset: Function,
  },
  methods: {
    text(): string {
      const text = this.messages.filter((msg) => this.score >= msg.min);

      return text[0] !== undefined ? text[0].msg : '';
    },
  },
  created(): void {
    this.messages.sort((a, b) => b.min - a.min);
  },
});
</script>