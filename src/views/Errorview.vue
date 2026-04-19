<template>
  <div class="error-page">
    <div class="error-page__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="error-page__breadcrumb-current">404 Error</span>
    </div>
    <div class="error-page__content">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <router-link to="/" class="error-page__home-btn">Back to home page</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorView — 404 not found page
 *
 * Purely presentational — no props, no emits, no store access, no reactive data.
 * Rendered by the catch-all route: /:pathMatch(.*)*
 * Also navigated to programmatically from DetailView when a product fetch fails.
 */
</script>
