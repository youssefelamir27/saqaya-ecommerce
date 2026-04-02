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

<style scoped>
.error-page {
  min-height: 10vh;
  padding: 40px 80px;
  position: relative;
}

.breadcrumb {
  font-size: 13px;
  color: #999999;
  margin-bottom: 80px;
  position: absolute;
  top: 0;
  left: 80px;
}

.breadcrumb a {
  text-decoration: none;
  color: #999999;
}

.breadcrumb a:hover {
  color: #000000;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
}

.error-content h1 {
  font-size: 80px;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.error-content p {
  font-size: 15px;
  color: #444444;
  margin: 0;
}

.home-btn {
  background-color: #db4444;
  color: #ffffff;
  text-decoration: none;
  padding: 14px 40px;
  border-radius: 4px;
  font-size: 15px;
  margin-top: 16px;
  transition: background-color 0.2s;
}

.home-btn:hover {
  background-color: #c03333;
}
</style>
