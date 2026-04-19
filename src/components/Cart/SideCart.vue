<template>
  <div>
    <div v-if="isSideCartOpen" class="side-cart-overlay" @click="handleClose">
      <div
        class="side-cart"
        @click.stop
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div class="side-cart__header">
          <h2 class="side-cart__title">My Cart</h2>
          <button class="side-cart__close" @click="handleClose" aria-label="Close cart">
            ✕
          </button>
        </div>

        <hr class="side-cart__divider" />

        <div v-if="isEmpty" class="side-cart__empty">
          <span class="side-cart__empty-icon">🛒</span>
          <p class="side-cart__empty-text">Your cart is empty</p>
          <button class="side-cart__shop-btn" @click="goToProducts">Shop Now</button>
        </div>

        <div v-else class="side-cart__body">
          <div class="side-cart__items">
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

          <div class="side-cart__total-row">
            <span class="side-cart__total-label">Total:</span>
            <span class="side-cart__total-value">${{ totalUSD }}</span>
          </div>

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
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';
import SideCartItem from './SideCartItem.vue';
import type { CartItem } from '@/types/product';

// use composable instead of store directly
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

function unlockScroll(): void {
  document.body.style.overflow = '';
}

function handleClose(): void {
  closeSideCart();
  unlockScroll();
}

function goToProducts(): void {
  closeSideCart();
  unlockScroll();
  router.push('/products');
}

function handleIncrease(productId: number): void {
  const item = sideCartItems.value.find((i: CartItem) => i.id === productId);
  if (item) {
    updateQuantity(productId, item.quantity + 1);
  }
}

function handleDecrease(productId: number): void {
  const item = sideCartItems.value.find((i: CartItem) => i.id === productId);
  if (!item) return;
  if (item.quantity === 1) {
    removeFromCart(productId);
  } else {
    updateQuantity(productId, item.quantity - 1);
  }
}
</script>
