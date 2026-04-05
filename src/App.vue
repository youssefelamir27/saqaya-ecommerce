<template>
  <div id="app">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MainLayout,
  },
};
</script>
