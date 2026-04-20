import { defineStore } from 'pinia';
import type { CartItem } from '@/types/product';

/**
 * useCartStore — Pinia store for shopping cart state
 *
 * Manages all cart-related state including items, quantities, and side cart visibility.
 * State is persisted across sessions via pinia-plugin-persistedstate.
 *
 * In Vue 2 this was a Vuex module with separate mutations and actions.
 * In Vue 3 + Pinia, actions directly mutate state — no mutations needed.
 *
 * Flow: component → useCart composable → useCartStore
 * Components should never import this store directly — use useCart() instead.
 */
export const useCartStore = defineStore('cart', {
  /**
   * state — reactive data for the cart
   *
   * @property sideCartItems - array of items currently in the cart
   * @property isSideCartOpen - controls visibility of the side cart drawer
   */
  state: () => ({
    sideCartItems: [] as CartItem[],
    isSideCartOpen: false as boolean,
  }),

  /**
   * getters — computed values derived from state
   * Equivalent to Vuex getters, accessed directly as store properties
   */
  getters: {
    /** Total number of items in cart (sum of all quantities) */
    cartItemCount: (state): number =>
      state.sideCartItems.reduce((total, item) => total + item.quantity, 0),

    /** Total price after discounts, formatted as USD string e.g. "24.99" */
    totalUSD: (state): string =>
      state.sideCartItems
        .reduce((total, item) => {
          const discounted = item.price * (1 - item.discountPercentage / 100);
          return total + discounted * item.quantity;
        }, 0)
        .toFixed(2),
  },

  /**
   * actions — methods that read and mutate state directly
   * Replace both Vuex actions AND mutations — no commit() needed
   */
  actions: {
    /**
     * addToCart — adds a product to the cart or stacks quantity if already present
     * @param product - CartItem to add (includes quantity chosen on detail page)
     */
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

    /**
     * removeFromCart — removes a product from the cart by id
     * @param productId - id of the product to remove
     */
    removeFromCart(productId: number) {
      this.sideCartItems = this.sideCartItems.filter(
        (item) => item.id !== productId
      );
    },

    /**
     * updateQuantity — sets exact quantity for a cart item
     * Used by SideCart +/- controls and DetailView "Update Cart"
     * @param productId - id of the product to update
     * @param quantity - new quantity to set
     */
    updateQuantity(productId: number, quantity: number) {
      const item = this.sideCartItems.find((item) => item.id === productId);
      if (item) item.quantity = quantity;
    },

    /** clearCart — empties all items from the cart */
    clearCart() {
      this.sideCartItems = [];
    },

    /** toggleSideCart — opens the drawer if closed, closes if open */
    toggleSideCart() {
      this.isSideCartOpen = !this.isSideCartOpen;
    },

    /** openSideCart — explicitly opens the side cart drawer */
    openSideCart() {
      this.isSideCartOpen = true;
    },

    /** closeSideCart — explicitly closes the side cart drawer */
    closeSideCart() {
      this.isSideCartOpen = false;
    },
  },

  /**
   * persist — persists selected state keys to localStorage
   * Cart items and drawer state survive page refreshes
   */
  persist: {
    pick: ['sideCartItems', 'isSideCartOpen'],
  },
});
