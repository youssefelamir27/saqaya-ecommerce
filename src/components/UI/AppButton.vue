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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppButton',

  props: {
    variant: {
      type: String as () => 'primary' | 'outline' | 'dark',
      default: 'primary',
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg',
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
