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
        :key="cat.name"
        :class="[
          'categories__card',
          { 'categories__card--active': activeCategory === cat.name },
        ]"
        @click="$emit('select-category', cat.name)"
      >
        <span class="categories__icon">{{ cat.icon }}</span>
        <p>{{ cat.name }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

interface Category {
  name: string;
  icon: string;
}

export default Vue.extend({
  name: 'BrowseCategory',

  props: {
    //receives categories array from HomeView via props
    categories: {
      type: Array as () => Category[],
      required: true,
    },
    //receives active category to highlight the correct card
    activeCategory: {
      type: String,
      required: true,
    },
  },

  // emits 'select-category' up to HomeView which dispatches to Vuex
});
</script>
