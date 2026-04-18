<template>
  <div class="contact__card">
    <div class="contact__card-header">
      <div class="contact__card-icon">
        <i :class="`fas ${icon}`" style="color: white"></i>
      </div>
      <h3>{{ title }}</h3>
    </div>
    <!-- slot allows parent to pass any content inside the box -->
    <slot />
  </div>
</template>

<script setup lang="ts">
// simple presentational component — only props, no logic
defineProps<{
  title: string;
  icon: string;
}>();
</script>
