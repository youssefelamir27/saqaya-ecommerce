<template>
  <div class="cart">
    <div class="cart__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="cart__breadcrumb-current">Cart</span>
    </div>

    <div v-if="cartStore.sideCartItems.length === 0" class="cart__empty">
      <p>Your cart is empty.</p>
      <router-link to="/products" class="cart__empty-btn">Shop Now</router-link>
    </div>

    <div v-else class="cart__wrapper">
      <div class="cart__items">
        <div v-for="item in cartStore.sideCartItems" :key="item.id" class="cart__item">
          <img :src="item.thumbnail" :alt="item.title" class="cart__item-image" />
          <div class="cart__item-info">
            <p class="cart__item-title">{{ item.title }}</p>
            <p class="cart__item-price">${{ discountedItemPrice(item) }}</p>
          </div>
          <div class="cart__item-controls">
            <button class="cart__qty-btn" @click="handleUpdateQuantity(item, item.quantity - 1)">-</button>
            <span class="cart__qty">{{ item.quantity }}</span>
            <button class="cart__qty-btn" @click="handleUpdateQuantity(item, item.quantity + 1)">+</button>
          </div>
          <button class="cart__remove-btn" @click="cartStore.removeFromCart(item.id)">✕</button>
        </div>
      </div>

      <div class="cart__summary">
        <h3 class="cart__summary-title">Order Summary</h3>
        <div class="cart__summary-row">
          <span>Items ({{ cartStore.cartItemCount }})</span>
          <span>${{ cartStore.totalUSD }}</span>
        </div>
        <button class="cart__checkout-btn">Proceed to Checkout</button>
        <button class="cart__clear-btn" @click="cartStore.clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@/types/product';

// useCartStore replaces all this.$store.getters['cart/...'] and mapActions
const cartStore = useCartStore();

function discountedItemPrice(item: CartItem): string {
  return (item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2);
}

function handleUpdateQuantity(item: CartItem, quantity: number): void {
  if (quantity < 1) {
    cartStore.removeFromCart(item.id);
  } else {
    cartStore.updateQuantity(item.id, quantity);
  }
}
</script>
