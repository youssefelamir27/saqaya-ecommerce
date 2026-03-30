<!-- <template>
  <div class="header">
    <h6>Exclusive</h6>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <input type="text" placeholder="What are you looking for?" />
    <i class="fas fa-search"></i>
    <i class="fas fa-cart-plus"></i>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: 'AppHeader',
};
</script> -->
<template>
  <div class="header">
    <h6 class="logo">Exclusive</h6>

    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <div class="search-bar">
      <input type="text" placeholder="What are you looking for?" />
      <i class="fas fa-search"></i>
    </div>

    <div class="cart-icon">
      <i class="fas fa-cart-plus" style="font-size: 20px"></i>
      <span class="cart-badge" v-if="!isErrorPage">2</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    isErrorPage() {
      return this.$route.name === 'ErrorPage';
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  width: 100%;
  z-index: 1000;
  /* margin-bottom: 200px; */
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 1px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav a {
  text-decoration: none;
  color: #000000;
  font-size: 15px;
  padding-bottom: 4px;
  transition: border-color 0.2s;
  position: relative;
}
.nav a::after {
  content: '';
  width: 0;
  height: 2px;
  background-color: #000000;
  position: absolute;
  bottom: 0;
  left: 0;
}
.nav a:hover::after {
  width: 100%;
  transition: 1s;
}
/* .nav a:hover,
.nav a.router-link-exact-active {
  border-bottom: 2px solid #000000;
} */

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 6px 12px;
  width: 240px;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #000000;
  width: 100%;
}

.search-bar input::placeholder {
  color: #999999;
}

.search-bar .fa-search {
  color: #000000;
  font-size: 14px;
  cursor: pointer;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-icon .fa-shopping-cart {
  /* font-size: 30px; */

  color: #000000;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #db4444;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
