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

<script lang="ts">
import Vue from 'vue';
import { Category } from '@/types/product';

export default Vue.extend({
  name: 'BrowseCategory',

  props: {
    // receives Category[] from API via HomeView
    categories: {
      type: Array as () => Category[],
      required: true,
    },
    activeCategory: {
      type: String,
      required: true,
    },
  },

  // emits 'select-category' with slug up to HomeView
});
</script>
