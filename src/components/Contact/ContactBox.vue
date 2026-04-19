<template>
  <div class="contact__card">
    <div class="contact__card-header">
      <div class="contact__card-icon">
        <i :class="`fas ${icon}`" style="color: white"></i>
      </div>
      <h3>{{ title }}</h3>
    </div>
    <!-- default slot — parent passes contact details or form content here -->
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ContactBox — reusable contact information card with icon and slot
 *
 * Displays a card with a header (icon + title) and a slot for flexible content.
 * Used twice in ContactView: once for "Call Us" and once for "Write To Us".
 *
 * The slot pattern keeps this component generic — it doesn't care what's inside,
 * making it reusable for any contact section type.
 *
 * @props title - heading text displayed next to the icon
 * @props icon - Font Awesome icon class e.g. 'fa-phone', 'fa-envelope'
 * @slot default - any content: text, forms, links, etc.
 *
 * @example
 * <ContactBox title="Call Us" icon="fa-phone">
 *   <p>+1 234 567 8900</p>
 * </ContactBox>
 */

defineProps<{
  title: string;
  icon: string;
}>();
</script>
