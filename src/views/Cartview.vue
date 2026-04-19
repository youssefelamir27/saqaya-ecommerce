<template>
  <div class="cart">
    <div class="cart__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="cart__breadcrumb-current">Cart</span>
    </div>

    <!-- Empty state — shown when cart has no items -->
    <div v-if="sideCartItems.length === 0" class="cart__empty">
      <p>Your cart is empty.</p>
      <router-link to="/products" class="cart__empty-btn">Shop Now</router-link>
    </div>

    <!-- Cart content — shown when cart has items -->
    <div v-else class="cart__wrapper">
      <div class="cart__items">
        <div v-for="item in sideCartItems" :key="item.id" class="cart__item">
          <img :src="item.thumbnail" :alt="item.title" class="cart__item-image" />
          <div class="cart__item-info">
            <p class="cart__item-title">{{ item.title }}</p>
            <!-- discountedItemPrice includes quantity multiplication -->
            <p class="cart__item-price">${{ discountedItemPrice(item) }}</p>
          </div>
          <div class="cart__item-controls">
            <!-- quantity -1 removes item if it would go below 1 -->
            <button class="cart__qty-btn" @click="handleUpdateQuantity(item, item.quantity - 1)">-</button>
            <span class="cart__qty">{{ item.quantity }}</span>
            <button class="cart__qty-btn" @click="handleUpdateQuantity(item, item.quantity + 1)">+</button>
          </div>
          <button class="cart__remove-btn" @click="removeFromCart(item.id)">✕</button>
        </div>
      </div>

      <!-- Order summary sidebar -->
      <div class="cart__summary">
        <h3 class="cart__summary-title">Order Summary</h3>
        <div class="cart__summary-row">
          <span>Items ({{ cartItemCount }})</span>
          <span>${{ totalUSD }}</span>
        </div>
        <button class="cart__checkout-btn">Proceed to Checkout</button>
        <button class="cart__clear-btn" @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CartView — full cart page (/cart)
 *
 * Displays all cart items with quantity controls, pricing, and an order summary.
 * This is the full-page cart — different from the SideCart drawer.
 *
 * All state and actions come from useCart() composable.
 * No local state needed — everything is derived from the cart store.
 *
 * handleUpdateQuantity removes the item if quantity would go below 1,
 * rather than allowing a 0 quantity state.
 */

import { useCart } from '@/composables/useCart';
import type { CartItem } from '@/types/product';

// all cart state via composable — no direct store access
const { sideCartItems, cartItemCount, totalUSD, removeFromCart, updateQuantity, clearCart } = useCart();

/**
 * discountedItemPrice — total price for one cart item after discount × quantity
 * @param item - CartItem to calculate price for
 */
function discountedItemPrice(item: CartItem): string {
  return (item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2);
}

/**
 * handleUpdateQuantity — updates quantity or removes item if quantity drops below 1
 * @param item - the CartItem being updated
 * @param quantity - the new quantity value
 */
function handleUpdateQuantity(item: CartItem, quantity: number): void {
  if (quantity < 1) {
    // remove instead of setting quantity to 0
    removeFromCart(item.id);
  } else {
    updateQuantity(item.id, quantity);
  }
}
</script>
