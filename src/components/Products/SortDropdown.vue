<template>
  <div class="sort-dropdown">
    <label class="sort-dropdown__label" for="sort-select">Sort by:</label>
    <select
      id="sort-select"
      class="sort-dropdown__select"
      :value="value"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface SortOption {
  value: string;
  label: string;
}

export default Vue.extend({
  name: 'SortDropdown',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // easy to add/remove sort options in one place
      sortOptions: [
        { value: '', label: 'Default' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating-desc', label: 'Rating: High to Low' },
        { value: 'rating-asc', label: 'Rating: Low to High' },
      ] as SortOption[],
    };
  },
});
</script>
