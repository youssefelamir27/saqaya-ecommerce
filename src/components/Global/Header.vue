<template>
  <div class="header">
    <div class="header__container">
      <!-- Logo -->
      <h6 class="header__logo">Exclusive</h6>

      <!-- Desktop Navigation -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <router-link class="header__nav-link" to="/" @click="closeMenu" exact
          >Home</router-link
        >
        <router-link class="header__nav-link" to="/contact" @click="closeMenu"
          >Contact</router-link
        >
        <router-link class="header__nav-link" to="/about" @click="closeMenu"
          >About</router-link
        >

        <!-- Mobile Search and Cart -->
        <div class="header__mobile-actions">
          <div class="header__search header__search--mobile">
            <input
              class="header__search-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <i class="header__search-icon fas fa-search"></i>
          </div>
          <div class="header__cart header__cart--mobile">
            <i class="fas fa-cart-plus"></i>
            <span class="header__cart-badge" v-if="!isErrorPage">{{
              quantity
            }}</span>
          </div>
        </div>
      </nav>

      <!-- Desktop Right Side -->
      <div class="header__actions">
        <div class="header__search">
          <input
            class="header__search-input"
            type="text"
            placeholder="What are you looking for?"
          />
          <i class="header__search-icon fas fa-search"></i>
        </div>
        <div class="header__cart">
          <i class="fas fa-cart-plus"></i>
          <span class="header__cart-badge" v-if="!isErrorPage">{{
            quantity
          }}</span>
        </div>
      </div>

      <!-- Hamburger -->
      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--active': isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false,
      quantity: localStorage.getItem('cartquantity')
        ? JSON.parse(localStorage.getItem('cartquantity'))
        : 0,
    };
  },
  computed: {
    isErrorPage() {
      return this.$route.name === 'ErrorPage';
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    syncCartQuantity() {
      this.quantity = localStorage.getItem('cartquantity')
        ? JSON.parse(localStorage.getItem('cartquantity'))
        : 0;
    },
  },
  created() {
    window.addEventListener('cart-updated', this.syncCartQuantity);
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.syncCartQuantity);
  },
};
</script>
