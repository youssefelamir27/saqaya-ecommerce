<template>
  <div class="error-page">
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span style="font-weight: bold; opacity: 1; color: black">404 Error</span>
    </div>

    <div class="error-content">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <router-link to="/" class="home-btn">Back to home page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorView',
};
</script>
