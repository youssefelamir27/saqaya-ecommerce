<template>
  <div class="sort-dropdown">
    <label class="sort-dropdown__label" for="sort-select">Sort by:</label>
    <select
      id="sort-select"
      class="sort-dropdown__select"
      :value="value"
      @change="$emit('input', $event.target.value)"
    >
      <option value="">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Rating: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SortDropdown',

  props: {
    // v-model compatible — receives value, emits input
    value: {
      type: String,
      default: '',
    },
  },
});
</script>
