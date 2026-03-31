<template>
  <div>
    <AppHeader />
    <main class="page-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/Global/Header.vue';
import AppFooter from '@/components/Global/Footer.vue';

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
.page-content {
  flex: 1;
  padding-top: 100px;
  min-height: calc(100vh - 200px);
}
</style>
