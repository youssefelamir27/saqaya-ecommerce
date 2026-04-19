<template>
  <div class="header">
    <div class="header__container">
      <!-- Logo -->
      <h6 class="header__logo">Exclusive</h6>

      <!-- Mobile overlay — clicking closes the nav drawer -->
      <div v-if="isMenuOpen" class="header__overlay" @click="closeMenu"></div>

      <!-- Navigation Drawer — slides in on mobile when isMenuOpen is true -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          class="header__nav-link"
          :to="link.to"
          @click="closeMenu"
        >
          {{ link.label }}
        </router-link>

        <!-- Mobile Search and Cart — only visible inside the drawer on mobile -->
        <div class="header__mobile-actions">
          <div class="header__search header__search--mobile">
            <input
              class="header__search-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <i class="header__search-icon fas fa-search"></i>
          </div>
          <div class="header__cart header__cart--mobile" @click="handleCartClick">
            <i class="fas fa-cart-plus"></i>
            <!-- badge hidden on error page and when cart is empty -->
            <span v-if="showCartBadge" class="header__cart-badge">
              {{ cartItemCount }}
            </span>
          </div>
        </div>
      </nav>

      <!-- Desktop Right Side — search and cart icon with badge -->
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
          <span v-if="showCartBadge" class="header__cart-badge">
            {{ cartItemCount }}
          </span>
        </div>
      </div>

      <!-- Hamburger — mobile only, toggles nav drawer -->
      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--active': isMenuOpen }"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AppHeader — global site header component
 *
 * Displays the logo, navigation links, search bar, and cart icon.
 * Handles both desktop layout and mobile drawer navigation.
 *
 * Cart state is accessed via useCart() composable — no direct store access.
 * Scroll lock is applied when mobile menu or side cart is open.
 *
 * Computed:
 *   - showCartBadge: hidden on error page and when cart is empty
 *
 * Local state:
 *   - isMenuOpen: controls mobile nav drawer visibility
 */

defineOptions({ name: 'AppHeader' })

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '@/composables/useCart';

// cart state via composable — clean architecture, no direct store import
const { cartItemCount, isSideCartOpen, toggleSideCart } = useCart();
const route = useRoute();

/** isMenuOpen — controls mobile navigation drawer open/close state */
const isMenuOpen = ref(false);

interface NavLink {
  label: string;
  to: string;
}

// static nav links — plain const, no reactivity needed
const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
];

/** isErrorPage — true when current route is the 404 error page */
const isErrorPage = computed(() => route.name === 'ErrorPage');

/**
 * showCartBadge — true when cart has items AND we're not on the error page
 * Badge is hidden on the error page to avoid confusion
 */
const showCartBadge = computed(
  () => !isErrorPage.value && cartItemCount.value > 0
);

/**
 * handleCartClick — toggles the side cart drawer and manages scroll lock
 * Locks body scroll when opening, unlocks when closing
 */
function handleCartClick(): void {
  const willOpen = !isSideCartOpen.value;
  toggleSideCart();
  document.body.style.overflow = willOpen ? 'hidden' : '';
}

/** toggleMenu — opens/closes the mobile nav drawer with scroll lock */
function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
}

/** closeMenu — closes the mobile nav drawer and unlocks scroll */
function closeMenu(): void {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
}
</script>
