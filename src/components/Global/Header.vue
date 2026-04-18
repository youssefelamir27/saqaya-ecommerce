<template>
  <div class="header">
    <div class="header__container">
      <!-- Logo -->
      <h6 class="header__logo">Exclusive</h6>

      <!-- Mobile overlay -->
      <div v-if="isMenuOpen" class="header__overlay" @click="closeMenu"></div>

      <!-- Navigation Drawer -->
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
          <div class="header__cart header__cart--mobile" @click="handleCartClick">
            <i class="fas fa-cart-plus"></i>
            <span v-if="showCartBadge" class="header__cart-badge">
              {{ cartStore.cartItemCount }}
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
          <span v-if="showCartBadge" class="header__cart-badge">
            {{ cartStore.cartItemCount }}
          </span>
        </div>
      </div>

      <!-- Hamburger -->
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const route = useRoute();

// reactive local state
const isMenuOpen = ref(false);

// static nav data — no reactivity needed
interface NavLink {
  label: string;
  to: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
];

// computed properties
const isErrorPage = computed(() => route.name === 'ErrorPage');
const showCartBadge = computed(
  () => !isErrorPage.value && cartStore.cartItemCount > 0
);

function handleCartClick(): void {
  const willOpen = !cartStore.isSideCartOpen;
  cartStore.toggleSideCart();
  document.body.style.overflow = willOpen ? 'hidden' : '';
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
}

function closeMenu(): void {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
}
</script>
