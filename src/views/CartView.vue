<template>
  <div class="cart">
    <div class="cart__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="cart__breadcrumb-current">Cart</span>
    </div>

    <div v-if="sideCartItems.length === 0" class="cart__empty">
      <p>Your cart is empty.</p>
      <router-link to="/products" class="cart__empty-btn">Shop Now</router-link>
    </div>

    <div v-else class="cart__wrapper">
      <div class="cart__items">
        <div v-for="item in sideCartItems" :key="item.id" class="cart__item">
          <img
            :src="item.thumbnail"
            :alt="item.title"
            class="cart__item-image"
          />
          <div class="cart__item-info">
            <p class="cart__item-title">{{ item.title }}</p>
            <p class="cart__item-price">${{ discountedItemPrice(item) }}</p>
          </div>
          <div class="cart__item-controls">
            <button
              class="cart__qty-btn"
              @click="handleUpdateQuantity(item, item.quantity - 1)"
            >
              -
            </button>
            <span class="cart__qty">{{ item.quantity }}</span>
            <button
              class="cart__qty-btn"
              @click="handleUpdateQuantity(item, item.quantity + 1)"
            >
              +
            </button>
          </div>
          <button class="cart__remove-btn" @click="removeFromCart(item.id)">
            ✕
          </button>
        </div>
      </div>

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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { CartItem } from '@/types/product';

export default Vue.extend({
  name: 'CartView',

  computed: {
    sideCartItems(): CartItem[] {
      return this.$store.getters['cart/sideCartItems'];
    },
    cartItemCount(): number {
      return this.$store.getters['cart/cartItemCount'];
    },
    totalUSD(): string {
      return this.$store.getters['cart/totalUSD'];
    },
  },

  methods: {
    ...mapActions('cart', ['removeFromCart', 'updateQuantity', 'clearCart']),

    discountedItemPrice(item: CartItem): string {
      return (
        item.price *
        (1 - item.discountPercentage / 100) *
        item.quantity
      ).toFixed(2);
    },

    handleUpdateQuantity(item: CartItem, quantity: number): void {
      if (quantity < 1) {
        this.removeFromCart(item.id);
      } else {
        this.updateQuantity({ productId: item.id, quantity });
      }
    },
  },
});
</script>
