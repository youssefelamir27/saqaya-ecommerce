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

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/Global/Header.vue';
import AppFooter from '@/components/Global/Footer.vue';
import SideCart from '@/components/Cart/SideCart.vue';

export default Vue.extend({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter,
    SideCart,
  },
});
</script>

<style scoped>
.page-content {
  flex: 1;
  padding-top: 100px;
  min-height: calc(100vh - 200px);
}
</style>
