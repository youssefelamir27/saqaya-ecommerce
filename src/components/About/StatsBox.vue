<template>
  <section class="stats">
    <!--
      Each card gets stats__card--active when its index matches activeIndex.
      Clicking emits 'select' with the index up to AboutView.
    -->
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

<script setup lang="ts">
/**
 * StatsBox — interactive statistics card grid
 *
 * Displays a row of stat cards (sellers, sales, customers, revenue).
 * The active card is highlighted via the stats__card--active class.
 *
 * Pure presentational component — no store access.
 * Data flows in from AboutView, selections flow out via emits.
 *
 * @props stats - array of StatItem objects (icon, value, label)
 * @props activeIndex - index of the currently highlighted stat card
 * @emits select - fires with the clicked card index up to AboutView
 */

import type { StatItem } from '@/types/product';

defineProps<{
  stats: StatItem[];
  activeIndex: number;
}>();

defineEmits<{
  select: [index: number];
}>();
</script>
