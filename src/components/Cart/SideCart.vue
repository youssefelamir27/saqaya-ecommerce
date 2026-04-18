<template>
  <div>
    <!-- Overlay -->
    <div v-if="cartStore.isSideCartOpen" class="side-cart-overlay" @click="handleClose">
      <!-- Drawer -->
      <div
        class="side-cart"
        @click.stop
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <!-- Header -->
        <div class="side-cart__header">
          <h2 class="side-cart__title">My Cart</h2>
          <button
            class="side-cart__close"
            @click="handleClose"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <hr class="side-cart__divider" />

        <!-- Empty state -->
        <div v-if="isEmpty" class="side-cart__empty">
          <span class="side-cart__empty-icon">🛒</span>
          <p class="side-cart__empty-text">Your cart is empty</p>
          <button class="side-cart__shop-btn" @click="goToProducts">
            Shop Now
          </button>
        </div>

        <!-- Items list -->
        <div v-else class="side-cart__body">
          <div class="side-cart__items">
            <SideCartItem
              v-for="item in cartStore.sideCartItems"
              :key="item.id"
              :item="item"
              @increase="handleIncrease"
              @decrease="handleDecrease"
              @remove="cartStore.removeFromCart"
            />
          </div>

          <hr class="side-cart__divider" />

          <!-- Total -->
          <div class="side-cart__total-row">
            <span class="side-cart__total-label">Total:</span>
            <span class="side-cart__total-value">${{ cartStore.totalUSD }}</span>
          </div>

          <!-- Actions -->
          <div class="side-cart__actions">
            <!-- Vue 3: @click.native is removed, use @click directly -->
            <router-link
              to="/cart"
              class="side-cart__view-btn"
              @click="handleClose"
            >
              View Cart
            </router-link>
            <button class="side-cart__checkout-btn">Checkout</button>
          </div>

          <button class="side-cart__clear" @click="cartStore.clearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import SideCartItem from './SideCartItem.vue';
import type { CartItem } from '@/types/product';

// useCartStore replaces this.$store.getters['cart/...'] and mapActions
const cartStore = useCartStore();
const router = useRouter();

// computed derived from store state
const isEmpty = computed(() => cartStore.sideCartItems.length === 0);

function lockScroll(): void {
  document.body.style.overflow = 'hidden';
}

function unlockScroll(): void {
  document.body.style.overflow = '';
}

function handleClose(): void {
  cartStore.closeSideCart();
  unlockScroll();
}

function goToProducts(): void {
  cartStore.closeSideCart();
  unlockScroll();
  router.push('/products');
}

function handleIncrease(productId: number): void {
  const item = cartStore.sideCartItems.find((i: CartItem) => i.id === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
}

function handleDecrease(productId: number): void {
  const item = cartStore.sideCartItems.find((i: CartItem) => i.id === productId);
  if (!item) return;
  if (item.quantity === 1) {
    cartStore.removeFromCart(productId);
  } else {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
}
</script>
