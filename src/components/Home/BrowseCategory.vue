<template>
  <section class="categories">
    <div class="section-header__badge">
      <span class="section-header__bar"></span>
      <span class="section-header__label">Categories</span>
    </div>
    <div class="section-header__title-row">
      <h2>Browse By Category</h2>
    </div>
    <div class="categories__slider">
      <div
        v-for="cat in categories"
        :key="cat.slug"
        :class="[
          'categories__card',
          { 'categories__card--active': activeCategory === cat.slug },
        ]"
        @click="$emit('select-category', cat.slug)"
      >
        <p>{{ cat.name }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '@/types/product';

// receives Category[] from API via HomeView
// emits 'select-category' with slug up to HomeView
defineProps<{
  categories: Category[];
  activeCategory: string;
}>();

defineEmits<{
  'select-category': [slug: string];
}>();
</script>
