<template>
  <div class="header">
    <div class="header__container">
      <!-- Logo -->
      <h6 class="header__logo">Exclusive</h6>

      <!-- Desktop Navigation -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <!--v-for replaces 3 repeated router-link blocks -->
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          class="header__nav-link"
          :to="link.to"
          :exact="link.exact"
          @click.native="closeMenu"
        >
          {{ link.label }}
        </router-link>

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
          <div
            class="header__cart header__cart--mobile"
            @click="handleCartClick"
          >
            <i class="fas fa-cart-plus"></i>
            <span class="header__cart-badge" v-if="showCartBadge">
              {{ cartItemCount }}
            </span>
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
        <div class="header__cart" @click="handleCartClick">
          <i class="fas fa-cart-plus"></i>
          <span class="header__cart-badge" v-if="showCartBadge">
            {{ cartItemCount }}
          </span>
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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

interface NavLink {
  label: string;
  to: string;
  exact: boolean;
}

export default Vue.extend({
  name: 'AppHeader',

  data() {
    return {
      isMenuOpen: false,
      // ✅ nav links as data array — easy to add/remove links in one place
      navLinks: [
        { label: 'Home', to: '/', exact: true },
        { label: 'Contact', to: '/contact', exact: false },
        { label: 'About', to: '/about', exact: false },
      ] as NavLink[],
    };
  },

  computed: {
    cartItemCount(): number {
      return this.$store.getters['cart/cartItemCount'];
    },
    isSideCartOpen(): boolean {
      return this.$store.getters['cart/isSideCartOpen'];
    },
    isErrorPage(): boolean {
      return this.$route.name === 'ErrorPage';
    },
    showCartBadge(): boolean {
      return !this.isErrorPage && this.cartItemCount > 0;
    },
  },

  methods: {
    ...mapActions('cart', ['toggleSideCart']),

    handleCartClick(): void {
      const willOpen = !this.isSideCartOpen;
      this.toggleSideCart();
      document.body.style.overflow = willOpen ? 'hidden' : '';
    },

    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },

    closeMenu(): void {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
  },
});
</script>
