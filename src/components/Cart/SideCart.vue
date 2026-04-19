<template>
  <div>
    <!-- Overlay — clicking outside the drawer closes the cart -->
    <div v-if="isSideCartOpen" class="side-cart-overlay" @click="handleClose">
      <!-- Drawer — @click.stop prevents overlay click from bubbling -->
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
          <button class="side-cart__close" @click="handleClose" aria-label="Close cart">
            ✕
          </button>
        </div>

        <hr class="side-cart__divider" />

        <!-- Empty state — shown when cart has no items -->
        <div v-if="isEmpty" class="side-cart__empty">
          <span class="side-cart__empty-icon">🛒</span>
          <p class="side-cart__empty-text">Your cart is empty</p>
          <button class="side-cart__shop-btn" @click="goToProducts">Shop Now</button>
        </div>

        <!-- Cart items list — shown when cart has items -->
        <div v-else class="side-cart__body">
          <div class="side-cart__items">
            <!--
              SideCartItem is a pure presentational component.
              Quantity changes are handled here via handleIncrease/handleDecrease
              to keep SideCartItem decoupled from the store.
            -->
            <SideCartItem
              v-for="item in sideCartItems"
              :key="item.id"
              :item="item"
              @increase="handleIncrease"
              @decrease="handleDecrease"
              @remove="removeFromCart"
            />
          </div>

          <hr class="side-cart__divider" />

          <!-- Total price after all discounts -->
          <div class="side-cart__total-row">
            <span class="side-cart__total-label">Total:</span>
            <span class="side-cart__total-value">${{ totalUSD }}</span>
          </div>

          <!-- Actions -->
          <div class="side-cart__actions">
            <router-link to="/cart" class="side-cart__view-btn" @click="handleClose">
              View Cart
            </router-link>
            <button class="side-cart__checkout-btn">Checkout</button>
          </div>

          <button class="side-cart__clear" @click="clearCart">Clear Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SideCart — slide-in cart drawer component
 *
 * Displays the cart overlay and drawer. Renders when isSideCartOpen is true.
 * Reads cart state and actions via useCart() composable — no direct store access.
 *
 * Quantity changes (increase/decrease) are handled here rather than in SideCartItem
 * to keep SideCartItem as a pure presentational component with no store dependency.
 *
 * Scroll lock is managed manually via document.body.style.overflow
 * to prevent background scrolling while the drawer is open.
 */

import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';
import SideCartItem from './SideCartItem.vue';
import type { CartItem } from '@/types/product';

// all cart state and actions come from the composable — not the store directly
const {
  sideCartItems,
  isSideCartOpen,
  totalUSD,
  isEmpty,
  removeFromCart,
  updateQuantity,
  clearCart,
  closeSideCart,
} = useCart();

const router = useRouter();

/** unlockScroll — restores body scroll after drawer closes */
function unlockScroll(): void {
  document.body.style.overflow = '';
}

/** handleClose — closes the drawer and unlocks scroll */
function handleClose(): void {
  closeSideCart();
  unlockScroll();
}

/** goToProducts — closes drawer and navigates to products page */
function goToProducts(): void {
  closeSideCart();
  unlockScroll();
  router.push('/products');
}

/**
 * handleIncrease — increments quantity of a cart item by 1
 * Called when SideCartItem emits 'increase'
 * @param productId - id of the item to increment
 */
function handleIncrease(productId: number): void {
  const item = sideCartItems.value.find((i: CartItem) => i.id === productId);
  if (item) {
    updateQuantity(productId, item.quantity + 1);
  }
}

/**
 * handleDecrease — decrements quantity by 1, or removes item if quantity is 1
 * Called when SideCartItem emits 'decrease'
 * @param productId - id of the item to decrement
 */
function handleDecrease(productId: number): void {
  const item = sideCartItems.value.find((i: CartItem) => i.id === productId);
  if (!item) return;
  if (item.quantity === 1) {
    // remove instead of setting quantity to 0
    removeFromCart(productId);
  } else {
    updateQuantity(productId, item.quantity - 1);
  }
}
</script>
