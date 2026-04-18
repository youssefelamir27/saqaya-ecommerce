<template>
  <button
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--size-${size}`,
      { 'btn--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
// Composition API — defineProps replaces props option
// no need to import Vue or Vue.extend()
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
  }
);

// defineEmits replaces $emit declarations
defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
