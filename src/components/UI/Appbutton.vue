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
/**
 * AppButton — reusable button component
 *
 * Generic button used throughout the app with configurable variant and size.
 * Content is passed via the default slot.
 *
 * CSS classes applied dynamically:
 *   - btn--{variant}: controls color scheme (primary, outline, dark)
 *   - btn--size-{size}: controls padding/font-size (sm, md, lg)
 *   - btn--disabled: applied alongside the native disabled attribute
 *
 * @props variant - visual style of the button (default: 'primary')
 * @props size - size of the button (default: 'md')
 * @props disabled - disables the button and applies disabled styling
 *
 * @emits click - native MouseEvent forwarded to parent on click
 *
 * @example
 * <AppButton variant="outline" size="lg" @click="handleClick">
 *   Shop Now
 * </AppButton>
 */

// defineProps replaces the Vue 2 props option — no Vue.extend() needed
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

// defineEmits replaces this.$emit declarations and documents the event contract
defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
