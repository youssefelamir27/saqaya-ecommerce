<template>
  <div id="app">
    <AppHeader />
    <main class="page-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from './components/Global/Header.vue';
import AppFooter from './components/Global/Footer.vue';
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c5037;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.page-content {
  flex: 1;
  padding-top: 100px;
}
</style>
