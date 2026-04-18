<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup lang="ts">
// in Vue 3 with <script setup>, imported components are auto-registered
import MainLayout from '@/layout/MainLayout.vue';
</script>
