<template>
  <section class="stats">
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      :class="['stats__card', { 'stats__card--active': index === activeIndex }]"
      @click="$emit('select', index)"
    >
      <div class="stats__icon-wrapper">
        <span>{{ stat.icon }}</span>
      </div>
      <h3>{{ stat.value }}</h3>
      <p>{{ stat.label }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { StatItem } from '@/types/product';

export default Vue.extend({
  name: 'StatsBox',

  props: {
    // receives stats array from AboutView
    stats: {
      type: Array as () => StatItem[],
      required: true,
    },
    // receives active index from AboutView to highlight correct card
    activeIndex: {
      type: Number,
      required: true,
    },
  },

  // emits 'select' with the clicked index up to AboutView
});
</script>
