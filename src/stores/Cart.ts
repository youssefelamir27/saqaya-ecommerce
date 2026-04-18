import { defineStore } from 'pinia';
import type { CartItem } from '@/types/product';

export const useCartStore = defineStore('cart', {
  state: () => ({
    sideCartItems: [] as CartItem[],
    isSideCartOpen: false as boolean,
  }),

  // getters replace Vuex getters
  getters: {
    cartItemCount: (state): number =>
      state.sideCartItems.reduce((total, item) => total + item.quantity, 0),

    totalUSD: (state): string =>
      state.sideCartItems
        .reduce((total, item) => {
          const discounted = item.price * (1 - item.discountPercentage / 100);
          return total + discounted * item.quantity;
        }, 0)
        .toFixed(2),
  },

  // actions replace both Vuex actions AND mutations — state mutated directly
  actions: {
    addToCart(product: CartItem) {
      const existing = this.sideCartItems.find((item) => item.id === product.id);
      if (existing) {
        // add the chosen quantity on top of the existing cart quantity
        existing.quantity += product.quantity;
      } else {
        // spread preserves the quantity passed in from the detail page
        this.sideCartItems.push({ ...product });
      }
    },

    removeFromCart(productId: number) {
      this.sideCartItems = this.sideCartItems.filter(
        (item) => item.id !== productId
      );
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.sideCartItems.find((item) => item.id === productId);
      if (item) item.quantity = quantity;
    },

    clearCart() {
      this.sideCartItems = [];
    },

    toggleSideCart() {
      this.isSideCartOpen = !this.isSideCartOpen;
    },

    openSideCart() {
      this.isSideCartOpen = true;
    },

    closeSideCart() {
      this.isSideCartOpen = false;
    },
  },

  // persist cart across sessions using pinia-plugin-persistedstate
  persist: {
    pick: ['sideCartItems', 'isSideCartOpen'],
  },
});
