<template>
  <div>
    <!-- Global header — always visible at the top -->
    <AppHeader />
    <!-- Side cart drawer — rendered globally so it's available on all pages -->
    <SideCart />
    <!-- Page content — route components are injected here via slot -->
    <main class="page-content">
      <slot />
    </main>
    <!-- Global footer — always visible at the bottom -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * MainLayout — global page layout wrapper
 *
 * Wraps all route-level views with the shared Header, Footer, and SideCart.
 * Used in App.vue as the root layout — every page is rendered inside its slot.
 *
 * In Vue 3 with <script setup>, imported components are automatically registered.
 * No need for a components: {} option like in Vue 2.
 *
 * Structure:
 *   AppHeader (fixed top navigation)
 *   SideCart  (slide-in drawer, globally available)
 *   <slot />  (current route's view component)
 *   AppFooter (bottom footer)
 */

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
