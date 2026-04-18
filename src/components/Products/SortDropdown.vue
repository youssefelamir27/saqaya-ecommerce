<template>
  <div class="sort-dropdown">
    <label class="sort-dropdown__label" for="sort-select">Sort by:</label>
    <select
      id="sort-select"
      class="sort-dropdown__select"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
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

<script setup lang="ts">
// Vue 3 v-model: modelValue + update:modelValue replaces value + input
withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: '',
  }
);

defineEmits<{
  'update:modelValue': [value: string];
}>();

// static data — no reactivity needed, plain const instead of data()
interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
];
</script>
