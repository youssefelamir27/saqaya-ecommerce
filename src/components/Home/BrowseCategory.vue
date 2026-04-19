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
      <!--
        Each card gets categories__card--active when its slug matches activeCategory.
        Clicking emits 'select-category' with the slug up to HomeView.
      -->
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
/**
 * BrowseCategory — horizontal category selector component
 *
 * Displays a scrollable row of beauty category cards.
 * The active category is highlighted via the categories__card--active class.
 *
 * Pure presentational component — no store access.
 * Data flows in via props from HomeView, selections flow out via emits.
 *
 * @props categories - array of Category objects fetched from the API
 * @props activeCategory - slug of the currently selected category
 * @emits select-category - fires with the clicked category slug
 */

import type { Category } from '@/types/product';

defineProps<{
  categories: Category[];
  activeCategory: string;
}>();

defineEmits<{
  'select-category': [slug: string];
}>();
</script>
