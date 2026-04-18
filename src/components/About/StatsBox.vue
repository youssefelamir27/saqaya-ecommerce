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

<script setup lang="ts">
import type { StatItem } from '@/types/product';

// receives stats array from AboutView
// receives active index from AboutView to highlight correct card
defineProps<{
  stats: StatItem[];
  activeIndex: number;
}>();

// emits 'select' with the clicked index up to AboutView
defineEmits<{
  select: [index: number];
}>();
</script>
