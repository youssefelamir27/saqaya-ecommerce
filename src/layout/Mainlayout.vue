<template>
  <div>
    <AppHeader />
    <SideCart />
    <main class="page-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// in Vue 3 with <script setup>, imported components are auto-registered
// no need for components: {} option
import AppHeader from '@/components/Global/Header.vue';
import AppFooter from '@/components/Global/Footer.vue';
import SideCart from '@/components/Cart/SideCart.vue';
</script>

<style scoped>
.page-content {
  flex: 1;
  padding-top: 100px;
  min-height: calc(100vh - 200px);
}
</style>
